import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import searchIcon from "../assets/searchIcon.png"
import user from "../assets/user.png"
import NoteCard from "./NoteCard"
import AddEditNoteForm from "./AddEditNoteForm"

import api from '../interceptors/axios.js'

function NotesPage() {
    const [navbarMobileFlag, setNavbarMobileFlag] = useState(false);
    const [profileIconClickedFlag, setProfileIconClickedFlag] = useState(false);
    const [addNewNoteClickedFlag, setAddNewNoteClickedFlag] = useState(false);

    const notesContainerheightRef = useRef(null);
    const formheightRef = useRef(null);


    function getAddImageFlag(flag){
        if(addNewNoteClickedFlag== true && flag == true){  
            notesContainerheightRef.current.style.height = formheightRef.current.offsetHeight + formheightRef.current.offsetTop + 50 + "px";
        }
        else if (addNewNoteClickedFlag == false){
            notesContainerheightRef.current.style.height = "fit-content";
        }
    }
    
    
    useEffect(() => {
        if (window.innerWidth <= "950") {
            // console.log("mobile"); 
            setNavbarMobileFlag(true);
        }
    }, [])
    useEffect(() =>{
        // console.log("useEffect working");
        getAddImageFlag();

    }, [addNewNoteClickedFlag, getAddImageFlag]);

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

    function onAddNewNoteClick() {
        setAddNewNoteClickedFlag(true);
    }
    function closeAddEditNoteForm() {
        setAddNewNoteClickedFlag(false);
    }


    const navigate = useNavigate();
    function onLogoutFunc(){
        console.log("Logout");
        api.post("/user/logout")
        .then((response) =>{
            // console.log(response);
            navigate("/")   
        })
        .catch((error) =>{
            console.log(error );    
        })
        
    }




    return (
        <>
            <div ref={notesContainerheightRef} className={`notesContainer ${addNewNoteClickedFlag && 'notesContainerDimmed'}`}>

                {/*----------- NAVBAR ------------ */}

                {(navbarMobileFlag == false) ? <div className="notesNavbarContainerDesktop">
                    <div className='notesLogoDiv'>
                        <img src={logo} alt="noteLogo" />
                        <h2 className="notesLogoName">NotesHere</h2>
                    </div>
                    <div className='notesSearchAddBtnDiv'>
                        <div className="notesSearchInput">
                            <input type="text" placeholder='search'spellCheck="false" />
                            <div className="notesSearchIcon"><img src={searchIcon} alt="search icon" /></div>
                        </div>
                        <div className="notesAddNoteBtnDiv">
                            <button onClick={onAddNewNoteClick} className="notesAddNoteBtn">Add New Note</button>
                        </div>
                    </div>
                    <div className="notesProfileIconDiv">
                        <img onMouseOver={onProfileIconMouseOver} onMouseOut={onPrfileIconMouseOut} src={user} alt="user image" />
                        {profileIconClickedFlag && <div onMouseOver={onProfileIconMouseOver} onMouseOut={onPrfileIconMouseOut} className="notesProfileIconDropdownDiv">
                            <Link className="YourProfileLink" to="/profile"><p className="yourProfile">Your Profile</p></Link>

                            <p onClick={onLogoutFunc} className="logoutBtn">Logout</p>
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
                                    <p onClick={onLogoutFunc} className="logoutBtn">Logout</p>
                                </div>}
                            </div>
                        </div>
                        <div className='notesSearchAddBtnDivMobile'>
                            <div className="notesSearchInput">
                                <input type="text" placeholder='search' />
                                <div className="notesSearchIcon"><img src={searchIcon} alt="search icon" /></div>
                            </div>
                            <div className="notesAddNoteBtnDiv">
                                <button onClick={onAddNewNoteClick} className="notesAddNoteBtn">Add New Note</button>
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
            {addNewNoteClickedFlag &&
                <div ref={formheightRef} className="notesAddEditNoteFormContainer">
                    <AddEditNoteForm addOrEdit="Add" closeAddEditNoteForm={closeAddEditNoteForm} getAddImageFlag={getAddImageFlag} />
                </div>
            }
            
        </>
    )
}

export default NotesPage