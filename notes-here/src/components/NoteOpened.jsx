import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import logo from "../assets/logo.png"
// import image from "../assets/image.png"
import AddEditNoteForm from "./AddEditNoteForm"
import api from '../interceptors/axios.js'


function NoteOpened() {
    const [editNoteClickedFlag, setEditNoteClickedFlag] = useState(false);

    const [noteDetails, setNoteDetails] = useState({});
    const location = useLocation();
    const backColorRef = useRef(null);
    const navigate = useNavigate();

    const notesContainerheightRef = useRef(null);
    const formheightRef = useRef(null);


    function getAddImageFlag(flag){
        // console.log(flag);
        // const originalHeight = notesContainerheightRef.current.offsetHeight;
        if(editNoteClickedFlag== true || flag == true){
            // console.log(formheightRef.current.offsetHeight); 
            
            notesContainerheightRef.current.style.height = formheightRef.current.offsetHeight + formheightRef.current.offsetTop + 50 + "px";
        }
        else if (editNoteClickedFlag == false){
            // console.log("form closed");
            // console.log(originalHeight);
            
            notesContainerheightRef.current.style.height = "fit-content";
        }
    }

    useEffect(() =>{
        // console.log("useEffect working");
        getAddImageFlag();

    }, [editNoteClickedFlag, getAddImageFlag]);


    useEffect(()=>{
        // console.log(location.state);
        const _id = location.state;
        api.get(`/note/getNote/${_id}`)
        .then(response =>{
            // console.log(response.data.note);
            setNoteDetails(response.data.note)
        })
        .catch(error =>{
            console.log(error);
            
        })
        // setNoteDetails(location.state)
        backColorRef.current.style.backgroundColor= `${noteDetails.color}`
        
    }, [editNoteClickedFlag, noteDetails])

    function onEditNoteClicked(){
        setEditNoteClickedFlag(true);
    }

    function closeAddEditNoteForm() {
        setEditNoteClickedFlag(false);
    }

    function onCloseBtnClickFunc(){
        navigate("/notes")
    }

    function onDeleteBtnClickFunc(){
        // console.log("Delete clicked");
        const _id = location.state;
        // console.log(_id);
        api.delete(`/note/deleteNote/${_id}`)
        .then((response) =>{
            // console.log(response);
            navigate("/notes")    
        })
        .catch((error) =>{
            console.log(error);     
        })
        
    }



    return (
        <>
            <div ref={notesContainerheightRef} className="openedNoteContainer">
                <div className="openedNoteNavbar">
                    <div className='notesLogoDiv'>
                        <img src={logo} alt="noteLogo" />
                        <h2 className="notesLogoName">NotesHere</h2>
                    </div>
                </div>
                <div ref={backColorRef} className="openedNoteDiv">
                    <h1 className='openedNoteTitle'>{noteDetails.title}</h1>
                    {noteDetails.contentImage && <img className='openedNoteImage' src={noteDetails.contentImage} alt="image" />}
                    <p className="openedNoteContent">{noteDetails.content}</p>
                    <div className="openedNoteOptionsDiv">
                        <button onClick={onCloseBtnClickFunc} className="openedNotecloseBtn">Close</button>
                        <div className="noteEditDeleteBtnsDiv">
                            <button onClick={onEditNoteClicked} className="openedNoteEditBtn">Edit</button>
                            <button onClick={onDeleteBtnClickFunc} className="openedNoteDeleteBtn">Delete</button>
                        </div>
                    </div>
                </div>
            {/* <AddEditNoteForm/> */}
            </div>
            {editNoteClickedFlag &&
                <div ref={formheightRef} className="notesAddEditNoteFormContainer">
                    <AddEditNoteForm addOrEdit="Edit" closeAddEditNoteForm={closeAddEditNoteForm} getAddImageFlag={getAddImageFlag} currentNoteDetails={noteDetails}/>
                </div>
            }
        </>
    )
}

export default NoteOpened