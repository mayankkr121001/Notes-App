import React, { useState } from 'react'
// import axios from 'axios';
import api from '../interceptors/axios.js';


function SignUpForm({ onSignInClick }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [inputError, setInputError] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [signedUpFlag, setSignedUpFlag] = useState(false);
    const [signUpError, setSignUPError] = useState("");




    function inputErrorFunc() {
        setInputError({
            username: "",
            password: "",
            confirmPassword: ""
        })
        if (username.trim() === "") {
            setInputError((prev) => ({ ...prev, username: "* username is required" }))
            // setInputError({username: "* username is required" })
        }
        if (password.trim() === "") {
            setInputError((prev) => ({ ...prev, password: "* password is required" }))

        }
        if (confirmPassword.trim() === "") {
            setInputError((prev) => ({ ...prev, confirmPassword: "* confirm password is required" }))
        }
        else if (confirmPassword !== password) {
            setInputError((prev) => ({ ...prev, confirmPassword: "* please enter same as above password" }))
        }

    }

    function signUpFunc(e) {
        e.preventDefault();
        // console.log(username, password, confirmPassword);
        inputErrorFunc();

        api.post("/user/register", {
            username: username,
            password: confirmPassword
        })
            .then((response) => {
                // console.log(response.status);
                if (response.status === 201) {
                    setSignedUpFlag(true);
                    setTimeout(() => {
                        setSignedUpFlag(false);
                    }, 3000);

                    setUsername("");
                    setPassword("");
                    setConfirmPassword("");
                }

            })
            .catch((error) => {
                // console.log(error.response.data.message);
                // console.log(error.message);
                if(error.message == "Network Error"){
                    setSignUPError("Server problem - Can't Register Now");
                }
                else{
                    setSignUPError(error.response.data.message);
                }
                // setSignUPError(error.response.data.message);
                setTimeout(() => {
                    setSignUPError("");
                }, 3000);
            })


    }


    return (
        <>
            <form className="signupDiv">
                <h2>Sign Up</h2>
                {signedUpFlag && <h3 className='signedUpMessage'>Signed up successfully</h3>}
                {signUpError != "" && <h3 className='signUpError'>{signUpError}</h3>}
                <div className='signupInputDiv'>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Username' value={username} />
                    {inputError.username && <p>{inputError.username}</p>}
                </div>
                <div className='signupInputDiv'>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' value={password} />
                    {inputError.password && <p>{inputError.password}</p>}
                </div>
                <div className='signupInputDiv'>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm password' value={confirmPassword} />
                    {/* <p>* confirm password is required</p> */}
                    {inputError.confirmPassword && <p>{inputError.confirmPassword}</p>}
                </div>
                <div className="formSignupBtnDiv">
                    <button onClick={signUpFunc} type='submit' className="formSignupBtn">SIGN UP</button>
                </div>
                <p onClick={onSignInClick} className='signupformSigninText'>Already a registered user? Sign In</p>
            </form>
        </>
    )
}

export default SignUpForm