import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NoteCard from "./NoteCard"
import logo from "../assets/logo.png"
import searchIcon from "../assets/searchIcon.png"
import user from "../assets/user.png"

function NotesPage() {
    const [navbarMobileFlag, setNavbarMobileFlag] = useState(false);
    const [profileIconClickedFlag, setProfileIconClickedFlag] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= "950") {
            console.log("mobile");
            setNavbarMobileFlag(true);
        }
    }, [])

    function onProfileIconClick() {
        setProfileIconClickedFlag(true);
        setTimeout(() => {
        setProfileIconClickedFlag(false);
        }, 3000);
    }
    function onProfileIconMouseOver() {
        setProfileIconClickedFlag(true);
    }
    function onPrfileIconMouseOut() {
        setProfileIconClickedFlag(false);
    }
    return (
        <>
            <div className="notesContainer">

                {/*----------- NAVBAR ------------ */}

                {(navbarMobileFlag == false) ? <div className="notesNavbarContainerDesktop">
                    <div className='notesLogoDiv'>
                        <img src={logo} alt="noteLogo" />
                        <h2 className="notesLogoName">NotesHere</h2>
                    </div>
                    <div className='notesSearchAddBtnDiv'>
                        <div className="notesSearchInput">
                            <input type="text" placeholder='search' />
                            <div className="notesSearchIcon"><img src={searchIcon} alt="search icon" /></div>
                        </div>
                        <div className="notesAddNoteBtnDiv">
                            <button className="notesAddNoteBtn">Add New Note</button>
                        </div>
                    </div>
                    <div className="notesProfileIconDiv">
                        <img onMouseOver={onProfileIconMouseOver} onMouseOut={onPrfileIconMouseOut} src={user} alt="user image" />
                        {profileIconClickedFlag && <div onMouseOver={onProfileIconMouseOver} onMouseOut={onPrfileIconMouseOut}className="notesProfileIconDropdownDiv">
                            <Link className="YourProfileLink" to="/profile"><p className="yourProfile">Your Profile</p></Link>
                            
                            <p className="logoutBtn">Logout</p>
                        </div>}
                    </div>
                </div>
                    : <div className="notesNavbarContainerMobile">
                        <div className="notesLogoProfileDivMobile">
                            <div className='notesLogoDiv'>
                                <img src={logo} alt="noteLogo" />
                                <h2 className="notesLogoName">NotesHere</h2>
                            </div>
                            <div className="notesProfileIconDiv">
                                <img onClick={onProfileIconClick} src={user} alt="user image" />
                                {profileIconClickedFlag && <div className="notesProfileIconDropdownDiv">
                                    <p className="yourProfile">Your Profile</p>
                                    <p className="logoutBtn">Logout</p>
                                </div>}
                            </div>
                        </div>
                        <div className='notesSearchAddBtnDivMobile'>
                            <div className="notesSearchInput">
                                <input type="text" placeholder='search' />
                                <div className="notesSearchIcon"><img src={searchIcon} alt="search icon" /></div>
                            </div>
                            <div className="notesAddNoteBtnDiv">
                                <button className="notesAddNoteBtn">Add New Note</button>
                            </div>
                        </div>
                    </div>}

                {/*----------- Notes Section ------------ */}
                <div className="notesSectionContainer">
                    <div className="notesSectionDiv">
                        <h2>All Notes</h2>
                        <div className="allNotesLine"></div>
                        <div className="notesListDiv">
                            <NoteCard />
                            <NoteCard />
                            <NoteCard />
                            <NoteCard />
                            <NoteCard />
                            <NoteCard />
                            <NoteCard />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NotesPage