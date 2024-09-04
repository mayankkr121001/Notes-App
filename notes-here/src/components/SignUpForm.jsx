import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
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

    const [loading, setLoading] = useState(false);


    function inputErrorFunc() {
        setInputError({
            username: "",
            password: "",
            confirmPassword: ""
        })
        if (username.trim() === "") {
            setInputError((prev) => ({ ...prev, username: "* username is required" }));
            setLoading(false);
        }
        if (password.trim() === "") {
            setInputError((prev) => ({ ...prev, password: "* password is required" }));
            setLoading(false);
        }
        if (confirmPassword.trim() === "") {
            setInputError((prev) => ({ ...prev, confirmPassword: "* confirm password is required" }));
            setLoading(false);
        }
        else if (confirmPassword !== password) {
            setInputError((prev) => ({ ...prev, confirmPassword: "* please enter same as above password" }));
            setLoading(false);
        }

    }

    function signUpFunc(e) {
        e.preventDefault();
        // console.log(username, password, confirmPassword);
        setLoading(true);
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
                    setLoading(false);

                }

            })
            .catch((error) => {
                // console.log(error.response.data.message);
                // console.log(error.message);
                if (error.message == "Network Error") {
                    setSignUPError("Server problem - Can't Register Now");
                }
                else {
                    setSignUPError(error.response.data.message);
                }
                // setSignUPError(error.response.data.message);
                setTimeout(() => {
                    setSignUPError("");
                }, 3000);

                setLoading(false);
            })


    }


    return (
        <>
            <form className="signupDiv">
                <h2>Sign Up</h2>
                {loading && <ColorRing
                    visible={true}
                    height="50"
                    width="50"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />}
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