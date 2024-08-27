import React, {useState} from 'react'
import api from '../interceptors/axios.js';


function ChangePassword({changePasswordClickFunc}) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    function onSaveBtnClick() {
        if (oldPassword.trim() !== "" && newPassword.trim() !== ""&& confirmPassword.trim() !== "" && newPassword === confirmPassword)  {
            // console.log("ok");
            api.patch("/user/updatePassword", { password: oldPassword, newPassword: confirmPassword })
                .then((response) => {
                    // console.log(response);
                    if (response.status == 200) {
                        changePasswordClickFunc();
                    }
                })
                .catch((error) => {
                    // console.log(error);
                    setError(error.response.data.message)
                    setTimeout(() => {
                        setError("")
                    }, 3000)

                })
        }

    }


    return (
        <>
            <div className="changePasswordContainer">
                {error && <p className='updateUsernamePasswordErrorClass'>{error}</p>}
                <div className="passwordDiv">
                    <label>Old Password:</label>
                    <input onChange={e => setOldPassword(e.target.value)} type="password" value={oldPassword}/>
                </div>
                <div className="newPasswordDiv">
                    <label>New Password:</label>
                    <input onChange={e => setNewPassword(e.target.value)} type="password" value={newPassword}/>
                </div>
                <div className="newConfirmPasswordDiv">
                    <label>Confirm Password:</label>
                    <input onChange={e => setConfirmPassword(e.target.value)} type="password" value={confirmPassword}/>
                </div>
                <div className="changePasswordSaveBtnDiv">
                    <button onClick={onSaveBtnClick} className="changePasswordSaveBtn">Save</button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword