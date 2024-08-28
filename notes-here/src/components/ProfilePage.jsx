import React, { useEffect, useState } from 'react'
import userLogo from "../assets/user.png"
import logo from "../assets/logo.png"
import EditProfile from "./EditProfile"
import ChangePassword from "./ChangePassword"
import UploadProfilePic from "./UploadProfilePic"

import useAuth from '../utils/auth.js'
import api from '../interceptors/axios.js'

function ProfilePage() {
    const [editProfileClickFlag, setEditProfileClickFlag] = useState(false);
    const [changePasswordClickFlag, setchangePasswordClickFlag] = useState(false);
    const [changeImageClickFlag, setChangeImageClickFlag] = useState(false);

    const [deleteProfileImageFlag, setDeleteProfileImageFlag] = useState(false);
    const [updateProfileImageFlag, setUpdateProfileImageFlag] = useState(false);
    const [updateUsernameFlag, setUpdateUsernameFlag] = useState(false);
    const [updatePasswordFlag, setUpdatePasswordFlag] = useState(false);

    // const { isAuthenticated, user } = useAuth();

    const [currUser, setCurrUser] = useState()

    function getAuthorizedUser(){
        api.get('/user/authorized-user')
                .then((response) => {
                    // console.log(response.data.user);
                    setCurrUser(response.data.user)
                })
                .catch((error)=>{
                     console.log(error);
                     
                })
    }

    useEffect(()=>{         
            // api.get('/user/authorized-user')
            //     .then((response) => {
            //         // console.log(response.data.user);
            //         setCurrUser(response.data.user)
            //     })
            //     .catch((error)=>{
            //          console.log(error);
                     
            //     })

            getAuthorizedUser();
        
    }, [])


    function updateProfileImage() {
        // setUploadedImageUrl(croppedImage);
        // console.log("profileImage Updated");
        setChangeImageClickFlag(false);

        setUpdateProfileImageFlag(true);
        setTimeout(() => {
            setUpdateProfileImageFlag(false)
        }, 3000)

        getAuthorizedUser();
    }

    function editProfileClickFunc(){
        setEditProfileClickFlag(false);

        setUpdateUsernameFlag(true);
        setTimeout(() => {
            setUpdateUsernameFlag(false);
        }, 3000)

        getAuthorizedUser();
    }
    function changePasswordClickFunc(){
        setchangePasswordClickFlag(false);

        setUpdatePasswordFlag(true);
        setTimeout(() => {
            setUpdatePasswordFlag(false);
        }, 3000)

        getAuthorizedUser();
    }

    function onChangeImageClick() {
        setChangeImageClickFlag(true);
        setEditProfileClickFlag(false);
        setchangePasswordClickFlag(false);
    }

    function onDeleteImageClick() {
        api.delete("/user/deleteProfileImage")
            .then((res) => {
                console.log(res);
                setDeleteProfileImageFlag(true);
                setTimeout(() => {
                    setDeleteProfileImageFlag(false);
                }, 3000)

                getAuthorizedUser();
            })
            .catch((err) => {
                console.log(err);

            })
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
        {/* <p>{currUser.username}</p> */}
            <div className='profileContainer'>
                <div className="profileNavbar">
                    <div className='notesLogoDiv'>
                        <img src={logo} alt="noteLogo" />
                        <h2 className="notesLogoName">NotesHere</h2>
                    </div>
                </div>
                <div className="profileDiv">
                    <h1>Profile</h1>
                    {deleteProfileImageFlag && <p className='deleteProfileImageMessage'>Profile image deleted successfully.</p>}
                    {updateProfileImageFlag && <p className='updateProfileImageMessage'>Profile image updated successfully.</p>}
                    {updateUsernameFlag && <p className='updateUsernameMessage'>Username updated successfully.</p>}
                    {updatePasswordFlag && <p className='updatePasswordMessage'>Password updated successfully.</p>}
                    <div className="profileDetailsDiv">
                        <div className="profileImageDiv">
                            {/* {isAuthenticated && user.profileImage ? <img src={user.profileImage} alt="profile image" /> : <img src={userLogo} alt="profile image" />} */}
                            {currUser?.profileImage ? <img src={currUser.profileImage} alt="profile image" /> : <img src={userLogo} alt="profile image" />}
                            <button onClick={onChangeImageClick} className="changeImageBtn">Change Photo</button>
                            <button onClick={onDeleteImageClick} className="deleteImageBtn">Delete Photo</button>
                        </div>
                        <div className="profileInfoDiv">
                            {/* {isAuthenticated && <h2>Hello, {currUser.username}</h2>} */}
                            {currUser?.username && <h2>Hello, {currUser.username}</h2>}
                            <button onClick={onEditProfileBtnClick} className="editProfileBtn">Edit Profile</button>
                            <button onClick={onChangePasswordBtnClick} className="changePasswordBtn">Change Password</button>
                            {editProfileClickFlag &&
                                <div className='editProfleChangePasswordFormContainer'>
                                    <EditProfile editProfileClickFunc={editProfileClickFunc}/>
                                    {/* <ChangePassword /> */}
                                </div>
                            }
                            {changePasswordClickFlag &&
                                <div className='editProfleChangePasswordFormContainer'>
                                    <ChangePassword changePasswordClickFunc={changePasswordClickFunc}/>
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