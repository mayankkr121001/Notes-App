import React from 'react'

function SignInForm({onSignUpClick}) {
    return (
        <>
            {/* <div className='signinContainer'> */}
                <form className="signinDiv">
                    <h2>Sign In</h2>
                    <div className='signinInputDiv'>
                        <input type="text" placeholder='Username' />
                    </div>
                    <div className='signinInputDiv'>
                        <input type="password" placeholder='Password'/>
                    </div>
                    <div className="formSigninBtnDiv">
                        <button type='submit' className="formSigninBtn">SIGN IN</button>
                    </div>
                    <p onClick={onSignUpClick} className='signinformSignupText'>Not a registered user? Sign Up</p>
                </form>
            {/* </div> */}

        </>
    )
}

export default SignInForm