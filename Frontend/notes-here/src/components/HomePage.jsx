import React, { useState } from 'react'
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import logo from "../assets/logo.png"

function HomePage() {
    const [openSignupFormFlag, setOpenSignupFormFlag] = useState(false);
    const [openSigninFormFlag, setOpenSigninFormFlag] = useState(false);

    function onSignUpClick() {
        setOpenSigninFormFlag(false);
        setOpenSignupFormFlag(true);
    }
    function onSignInClick() {
        setOpenSignupFormFlag(false);
        setOpenSigninFormFlag(true);
    }


    return (
        <>
            <div className='homeContainer'>
                <div className='homeNavbarContainer'>
                    <div className='homeLogoDiv'>
                        <img src={logo} alt="noteLogo" />
                        <h2 className="homeLogoName">NotesHere</h2>
                    </div>
                    <div className="navSigninSignupBtns">
                        <button onClick={onSignInClick} className="navSigninBtn">SIGN IN</button>
                        <button onClick={onSignUpClick} className="navSignupBtn">SIGN UP</button>
                    </div>
                </div>
                <div className="homeSectionContainer">
                    <div className="homeSectionDiv">
                        <h1 className="homeSectionHeding">Welcome to NotesHere</h1>
                        <p className="homeSectionPara">
                            We provide a user-friendly platform designed to help you organize, store, and manage your notes efficiently. Enjoy seamless access across devices with our intuitive, feature-rich interface.</p>
                        <button onClick={onSignUpClick} className="sectionSignupBtn">SIGN UP</button>
                    </div>
                    {openSignupFormFlag && <div className='homeSigninSignupFormDiv '>
                        <SignUpForm onSignInClick={onSignInClick}/>
                    </div>}
                    {openSigninFormFlag && <div className='homeSigninSignupFormDiv '>
                        <SignInForm onSignUpClick={onSignUpClick}/>
                    </div>}
                </div>
                {/* <div className="homeFooterContainer">
                    <p>&copy; 2024 NotesHere. All rights reserved.</p>
                </div> */}
                {/* <SignUpForm/>
        <SignInForm/> */}
            </div>

        </>
    )
}

export default HomePage