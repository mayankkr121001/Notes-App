import React, { useEffect, useRef } from 'react'
import pin from "../assets/pin.png"


function NoteCard({title, color, onNoteCardClickFunc}) {
    const cardRef = useRef(null);

    useEffect(()=>{
        cardRef.current.style.backgroundColor = `${color}`;
    },[])

    return (
        <>
            <div ref={cardRef} onClick={onNoteCardClickFunc} className="cardDiv">
                <h3>{title}</h3>
                <div className="cardOptions">
                    <img src={pin} alt="" />
                </div>
            </div>
        </>
    )
}

export default NoteCard