import React, { useState } from 'react'
import user from "../assets/user.png"
import logo from "../assets/logo.png"
import EditProfile from "./EditProfile"
import ChangePassword from "./ChangePassword"
import UploadProfilePic from "./UploadProfilePic"

function ProfilePage() {
    const [editProfileClickFlag, setEditProfileClickFlag] = useState(false);
    const [changePasswordClickFlag, setchangePasswordClickFlag] = useState(false);
    const [changeImageClickFlag, setChangeImageClickFlag] = useState(false);

    const [uploadedImageUrl, setUploadedImageUrl] = useState(user);

    function updateProfileImage(croppedImage) {
        setUploadedImageUrl(croppedImage);
    }

    function onChangeImageClick() {
        setChangeImageClickFlag(true);
        setEditProfileClickFlag(false);
        setchangePasswordClickFlag(false);
    }

    function onEditProfileBtnClick() {
        setEditProfileClickFlag(true);
        setchangePasswordClickFlag(false);
        setChangeImageClickFlag(false);


    }
    function onChangePasswordBtnClick() {
        setchangePasswordClickFlag(true);
        setEditProfileClickFlag(false);
        setChangeImageClickFlag(false);


    }

    return (
        <>
            <div className='profileContainer'>
            <div className="profileNavbar">
                    <div className='notesLogoDiv'>
                        <img src={logo} alt="noteLogo" />
                        <h2 className="notesLogoName">NotesHere</h2>
                    </div>
                </div>
                <div className="profileDiv">
                    <h1>Profile</h1>
                    <div className="profileDetailsDiv">
                        <div className="profileImageDiv">
                            <img src={uploadedImageUrl} alt="profile image" />
                            <button onClick={onChangeImageClick} className="changeImageBtn">Change Photo</button>
                            <button className="deleteImageBtn">Delete Photo</button>
                        </div>
                        <div className="profileInfoDiv">
                            <h2>Hello, Username</h2>
                            <button onClick={onEditProfileBtnClick} className="editProfileBtn">Edit Profile</button>
                            <button onClick={onChangePasswordBtnClick} className="changePasswordBtn">Change Password</button>
                            {editProfileClickFlag &&
                                <div className='editProfleChangePasswordFormContainer'>
                                    <EditProfile />
                                    {/* <ChangePassword /> */}
                                </div>
                            }
                            {changePasswordClickFlag &&
                                <div className='editProfleChangePasswordFormContainer'>
                                    <ChangePassword />
                                </div>
                            }
                            {changeImageClickFlag &&
                                <div className='editProfleChangePasswordFormContainer'>
                                    <UploadProfilePic updateProfileImage={updateProfileImage} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfilePage