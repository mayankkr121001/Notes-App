import { Router } from "express";
import {registerUser, loginUser, logoutUser, refreshAccessToken, getAuthorizedUser, uploadProfileImage, deleteProfileImage, updateUsername, updatePassword} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)


router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/authorized-user").get(verifyJWT, getAuthorizedUser)
router.route("/uploadProfileImage").post(verifyJWT, upload.single("profileImage"), uploadProfileImage);
router.route("/deleteProfileImage").delete(verifyJWT, deleteProfileImage);
router.route("/updateUsername").patch(verifyJWT, updateUsername);
router.route("/updatePassword").patch(verifyJWT, updatePassword);

export default router