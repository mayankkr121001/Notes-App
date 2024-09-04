import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
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
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    function inputErrorFunc() {
        setInputError({
            username: "",
            password: ""
        })
        if (username.trim() === "") {
            setInputError((prev) => ({ ...prev, username: "* username is required" }))
            setLoading(false);

        }
        if (password.trim() === "") {
            setInputError((prev) => ({ ...prev, password: "* password is required" }))
            setLoading(false);


        }
    }

    function signInFunc(e) {
        e.preventDefault();
        // console.log(username, password, confirmPassword);
        setLoading(true);
        inputErrorFunc();


        api.post("/user/login", {
            username, password
        })
            .then((response) => {
                // console.log(response)
                // console.log(response.data.at);
                if (response.status === 200) {
                    navigate("/notes");
                    setUsername("");
                    setPassword("");

                }
                setLoading(false);


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

                setLoading(false);

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
                {loading && <ColorRing
                    visible={true}
                    height="50"
                    width="50"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />}
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