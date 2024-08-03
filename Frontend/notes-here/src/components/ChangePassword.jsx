import React from 'react'

function ChangePassword() {
    return (
        <>
            <div className="changePasswordContainer">
                <div className="passwordDiv">
                    <label>Password:</label>
                    <input type="password" />
                </div>
                <div className="newPasswordDiv">
                    <label>New Password:</label>
                    <input type="password" />
                </div>
                <div className="newConfirmPasswordDiv">
                    <label>Confirm Password:</label>
                    <input type="password" />
                </div>
                <div className="changePasswordSaveBtnDiv">
                    <button className="changePasswordSaveBtn">Save</button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword