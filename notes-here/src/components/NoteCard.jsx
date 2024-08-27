import React, { useEffect, useRef } from 'react'
import pin from "../assets/pin.png"


function NoteCard({ title, color, onNoteCardClickFunc , pinNoteClickFunc}) {
    const cardRef = useRef(null);

    useEffect(() => {
        // console.log(color);

        if (color === null) {
            cardRef.current.style.backgroundColor = `white`;
        }
        else {
            cardRef.current.style.backgroundColor = `${color}`;
        }
    }, [color])

    return (
        <>
            <div ref={cardRef} onClick={onNoteCardClickFunc} className="cardDiv">
                <h3>{title}</h3>
                <div className="cardOptions">
                    <img onClick={pinNoteClickFunc} src={pin} alt="" />
                </div>
            </div>
        </>
    )
}

export default NoteCard