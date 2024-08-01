import React from 'react'
import pin from "../assets/pin.png"
import edit from "../assets/edit.png"
import deleteIcon from "../assets/delete.png"


function NoteCard() {
    return (
        <>
            <div className="cardDiv">
                <h3>Title</h3>
                <div className="cardOptions">
                    <img src={pin} alt="" />
                    <img src={edit} alt="" />
                    <img src={deleteIcon} alt="" />
                </div>
            </div>
        </>
    )
}

export default NoteCard