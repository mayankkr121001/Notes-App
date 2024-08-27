import React, { useState } from 'react'
import api from '../interceptors/axios.js';

function EditProfile({editProfileClickFunc}) {
    const [newUsername, setNewUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    function onSaveBtnClick() {
        if (newUsername.trim() !== "" && password.trim() !== "") {
            // console.log("ok");
            api.patch("/user/updateUsername", { username: newUsername, password: password })
                .then((response) => {
                    // console.log(response);
                    if (response.status == 200) {

                        editProfileClickFunc();
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
            <div className="editProfileContainer">
                {error && <p className='updateUsernamePasswordErrorClass'>{error}</p>}
                <div className="usenameDiv">
                    <label>Change Username:</label>
                    <input onChange={e => setNewUsername(e.target.value)} type="text" value={newUsername} />
                </div>
                <div className="passwordDiv">
                    <label>Password:</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" value={password} />
                </div>
                <div className="editProfileSaveBtnDiv">
                    <button onClick={onSaveBtnClick} className="editProfileSaveBtn">Save</button>
                </div>
            </div>
        </>
    )
}

export default EditProfile