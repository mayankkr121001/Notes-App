import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import api from '../interceptors/axios.js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../utils/auth.js';




function SignInForm({ onSignUpClick }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState({
        username: "",
        password: "",
    });

    const [signInError, setSignInError] = useState("");

    const navigate = useNavigate();



    function inputErrorFunc() {
        setInputError({
            username: "",
            password: ""
        })
        if (username.trim() === "") {
            setInputError((prev) => ({ ...prev, username: "* username is required" }))
        }
        if (password.trim() === "") {
            setInputError((prev) => ({ ...prev, password: "* password is required" }))

        }
    }

    function signInFunc(e) {
        e.preventDefault();
        // console.log(username, password, confirmPassword);
        inputErrorFunc();


        api.post("/user/login", {
            username, password
        }, { withCredentials: true })
            .then((response) => {
                // console.log(response)
                // console.log(response.data.at);
                if (response.status === 200) {
                    navigate("/notes");
                    setUsername("");
                    setPassword("");
                }

            })
            .catch((error) => {
                // console.log("Login Error");
                // console.log(error.response.data.message);

                // console.log(error.message);
                if (error.message == "Network Error") {
                    setSignInError("Server problem - Can't Login Now");
                }
                else {
                    setSignInError(error.response.data.message);
                }
                setTimeout(() => {
                    setSignInError("");
                }, 3000);

            })

            // api.get('/user/authorized-user')
            //     .then((response) => {
            //         console.log(response)
            //         // setAuth({ isAuthenticated: true, user: response.data.user });
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //         // setAuth({ isAuthenticated: false, user: null });

            //     })

        // axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`

    }

    return (
        <>
            <form className="signinDiv">
                <h2>Sign In</h2>
                {signInError != "" && <h3 className='signInError'>{signInError}</h3>}
                <div className='signinInputDiv'>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Username' value={username} />
                    {inputError.username && <p>{inputError.username}</p>}
                </div>
                <div className='signinInputDiv'>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' value={password} />
                    {inputError.password && <p>{inputError.password}</p>}
                </div>
                <div className="formSigninBtnDiv">
                    <button onClick={signInFunc} type='submit' className="formSigninBtn">SIGN IN</button>
                </div>
                <p onClick={onSignUpClick} className='signinformSignupText'>Not a registered user? Sign Up</p>
            </form>
        </>
    )
}

export default SignInForm