import React from 'react'

function SignUpForm({onSignInClick}) {
    return (
        <>
            {/* <div className='signupContainer'> */}
                <form className="signupDiv">
                    <h2>Sign Up</h2>
                    <div className='signupInputDiv'>
                        <input type="text" placeholder='Username' />
                    </div>
                    <div className='signupInputDiv'>
                        <input type="password" placeholder='Password'/>
                    </div>
                    <div className='signupInputDiv'>
                        <input type="password" placeholder='Confirm password'/>
                    </div>
                    <div className="formSignupBtnDiv">
                        <button type='submit' className="formSignupBtn">SIGN UP</button>
                    </div>
                    <p onClick={onSignInClick} className='signupformSigninText'>Already a registered user? Sign In</p>
                </form>
            {/* </div> */}

        </>
    )
}

export default SignUpForm