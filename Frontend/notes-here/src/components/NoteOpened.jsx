import React from 'react'
import logo from "../assets/logo.png"

function NoteOpened() {
    return (
        <>
            <div className="openedNoteContainer">
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
                            <button className="openedNoteEditBtn">Edit</button>
                            <button className="openedNoteDeleteBtn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteOpened