import React from 'react'

function EditProfile() {
    return (
        <>
            <div className="editProfileContainer">
                <div className="usenameDiv">
                    <label>Change Username:</label>
                    <input type="text" />
                </div>
                <div className="passwordDiv">
                    <label>Password:</label>
                    <input type="password" />
                </div>
                <div className="editProfileSaveBtnDiv">
                    <button className="editProfileSaveBtn">Save</button>
                </div>
            </div>
        </>
    )
}

export default EditProfile