import React, { useState, useRef, useEffect } from 'react'
import logo from "../assets/logo.png"
import AddEditNoteForm from "./AddEditNoteForm"


function NoteOpened() {
    const [editNoteClickedFlag, setEditNoteClickedFlag] = useState(false);

    const notesContainerheightRef = useRef(null);
    const formheightRef = useRef(null);


    function getAddImageFlag(flag){
        // console.log(flag);
        const originalHeight = notesContainerheightRef.current.offsetHeight;
        if(editNoteClickedFlag== true && flag == true){
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

    function onEditNoteClicked(){
        setEditNoteClickedFlag(true);
    }

    function closeAddEditNoteForm() {
        setEditNoteClickedFlag(false);
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
                <div className="openedNoteDiv">
                    <h1 className='openedNoteTitle'>Title</h1>
                    <p className="openedNoteContent">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error reprehenderit quidem accusantium! Illum ea praesentium optio nisi qui laudantium sed totam blanditiis harum, consequatur error esse asperiores odit eius architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nobis laboriosam sunt adipisci in, laudantium voluptatem enim quas minima atque.</p>
                    <div className="openedNoteOptionsDiv">
                        <button className="openedNotecloseBtn">Close</button>
                        <div className="noteEditDeleteBtnsDiv">
                            <button onClick={onEditNoteClicked} className="openedNoteEditBtn">Edit</button>
                            <button className="openedNoteDeleteBtn">Delete</button>
                        </div>
                    </div>
                </div>
            {/* <AddEditNoteForm/> */}
            </div>
            {editNoteClickedFlag &&
                <div ref={formheightRef} className="notesAddEditNoteFormContainer">
                    <AddEditNoteForm addOrEdit="Edit" closeAddEditNoteForm={closeAddEditNoteForm} getAddImageFlag={getAddImageFlag}/>
                </div>
            }
        </>
    )
}

export default NoteOpened