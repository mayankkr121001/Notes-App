import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'

import logo from "../assets/logo.png"
// import image from "../assets/image.png"
import AddEditNoteForm from "./AddEditNoteForm"
import api from '../interceptors/axios.js'


function NoteOpened() {
    const [editNoteClickedFlag, setEditNoteClickedFlag] = useState(false);

    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        const _id = location.state;
        api.get(`/note/getNote/${_id}`)
        .then(response =>{
            // console.log(response.data.note);
            setNoteDetails(response.data.note)

            setLoading(false);
        })
        .catch(error =>{
            console.log(error);
            
        })
        // setNoteDetails(location.state)
        // backColorRef.current.style.backgroundColor= `${noteDetails.color}`
        
    }, [editNoteClickedFlag])

    useEffect(()=>{
        backColorRef.current.style.backgroundColor= `${noteDetails.color}`
    }, [noteDetails])

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
        setLoading(true);

        const _id = location.state;
        // console.log(_id);
        api.delete(`/note/deleteNote/${_id}`)
        .then((response) =>{
            // console.log(response);
            setLoading(false);
            
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
                {loading && <div style={{textAlign: "center"}}><ColorRing
                    visible={true}
                    height="50"
                    width="50"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                /></div>}
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