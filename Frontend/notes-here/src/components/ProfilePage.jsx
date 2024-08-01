import React from 'react'
import user from "../assets/user.png"

function ProfilePage() {
    return (
        <>
            <div className='profileContainer'>
                <div className="profileDiv">
                    <h1>Profile</h1>
                    <div className="profileDetailsDiv">
                        <div className="profileImageDiv">
                            <img src={user} alt="profile image" />
                            <button className="changeImageBtn">Change Photo</button>
                            <button className="deleteImageBtn">Delete Photo</button>
                        </div>
                        <div className="profileInfoDiv">
                            <h2>Hello, Username</h2>
                            <button className="editProfileBtn">Edit Profile </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfilePage