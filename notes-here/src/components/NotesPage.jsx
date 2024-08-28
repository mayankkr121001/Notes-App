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

    const [searchInput, setSearchInput] = useState();

    const [notesArray, setNotesArray] = useState([]);
    const [filteredNotesArray, setFilteredNotesArray] = useState([]);
    const [pinnedNotesArray, setPinnedNotesArray] = useState([]);

    const notesContainerheightRef = useRef(null);
    const formheightRef = useRef(null);


    function getAddImageFlag(flag) {
        if (addNewNoteClickedFlag == true && flag == true) {
            notesContainerheightRef.current.style.height = formheightRef.current.offsetHeight + formheightRef.current.offsetTop + 50 + "px";
        }
        else if (addNewNoteClickedFlag == false) {
            notesContainerheightRef.current.style.height = "fit-content";
        }
    }


    useEffect(() => {
        if (window.innerWidth <= "950") {
            // console.log("mobile"); 
            setNavbarMobileFlag(true);
        }

    }, [])

    function getPinnedNotes(){
        api.get("/note/getPinnedNotes")
            .then((response) => {
                // console.log(response.data.pinnedNotes);  
                setPinnedNotesArray(response.data.pinnedNotes)
            })
            .catch((error) => {
                // console.log(error.response.data.message);
                if(error.response.data.message === "No pinned notes found"){
                    setPinnedNotesArray([])
                }

            })
    }
    useEffect(() => {
        getPinnedNotes();

    }, [])



    useEffect(() => {

        api.get('/note/getNotes')
            .then((response) => {
                // console.log(response.data.notes);
                setNotesArray(response.data.notes)

            })
            .catch((error) => {
                console.log(error);
            })


        // console.log(notesArray);
        if (addNewNoteClickedFlag) {
            setFilteredNotesArray([]);
        }


    }, [addNewNoteClickedFlag])

    useEffect(() => {
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
    function onLogoutFunc() {
        // console.log("Logout");
        api.post("/user/logout")
            .then((response) => {
                // console.log(response);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            })

    }


    // function to navigate to NoteOpened page
    function onNoteCardClickFunc(noteId) {
        // console.log("Note Clicked";
        // console.log(noteId);
        navigate("/yourNote", { state: noteId })
    }

    function onSearchInputChange(e) {
        const inputValue = e.target.value.toLowerCase();
        setSearchInput(inputValue);

        const filterNotes = notesArray.filter((elm) => elm.title.toLowerCase().includes(inputValue));

        // console.log(filterNotes);
        setFilteredNotesArray(filterNotes)
    }


    function pinNoteClickFunc(note) {
        // console.log("pinned Click",note._id);

        const noteId = note._id;
        api.patch(`/note/pinNote/${noteId}`)
            .then((response) => {
                // console.log(response);
                getPinnedNotes();
            })
            .catch((error) => {
                console.log(error);

            })

    }
    function unpinNoteClickFunc(note) {
        // console.log("unpinned Click",note._id);
        const noteId = note._id;
        api.patch(`/note/unpinNote/${noteId}`)
            .then((response) => {
                // console.log(response);
                getPinnedNotes();
            })
            .catch((error) => {
                console.log(error);

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
                            <input onChange={onSearchInputChange} type="text" placeholder='search' spellCheck="false" value={searchInput} />
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
                                    <Link className="YourProfileLink" to="/profile"><p className="yourProfile">Your Profile</p></Link>
                                    <p onClick={onLogoutFunc} className="logoutBtn">Logout</p>
                                </div>}
                            </div>
                        </div>
                        <div className='notesSearchAddBtnDivMobile'>
                            <div className="notesSearchInput">
                                <input onChange={onSearchInputChange} type="text" placeholder='search' value={searchInput} />
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
                        {pinnedNotesArray.length !== 0 && <div className="pinnedNotesDiv">
                            <h2>Pinned Notes</h2>
                            <div className="pinnedNotesListDiv">
                                {pinnedNotesArray.map((elm, index) => (
                                    <NoteCard onNoteCardClickFunc={() => onNoteCardClickFunc(elm._id)} key={index} title={elm.title} color={elm.color} pinNoteClickFunc={(e) => { e.stopPropagation(); unpinNoteClickFunc(elm) }} />
                                ))}
                            </div>

                        </div>}
                        <h2>All Notes</h2>
                        {/* <div className="allNotesLine"></div> */}
                        {notesArray.length === 0 && <p className='notesListNoNotesMessage'>No notes availabe !</p>}
                        {(searchInput && filteredNotesArray.length === 0) && <p className='notesListNoNotesMessage'>No matching notes !</p>}
                        <div className="notesListDiv">
                            {searchInput || filteredNotesArray.length !== 0 ? filteredNotesArray.map((elm, index) => (
                                <NoteCard onNoteCardClickFunc={() => onNoteCardClickFunc(elm._id)} key={index} title={elm.title} color={elm.color} />))
                                : notesArray.map((elm, index) => (
                                    <NoteCard onNoteCardClickFunc={() => onNoteCardClickFunc(elm._id)} key={index} title={elm.title} color={elm.color} pinNoteClickFunc={(e) => { e.stopPropagation(); pinNoteClickFunc(elm) }} />
                                ))}

                            {/* <NoteCard />
                            <NoteCard />
                            <NoteCard />
                            <NoteCard />
                            <NoteCard /> */}

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