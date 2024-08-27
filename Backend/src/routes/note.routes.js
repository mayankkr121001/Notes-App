import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {createNote, getNotesByUserId, getNote, deleteNote, editNote, pinNote, unpinNote, getPinnedNotes} from "../controllers/note.controller.js"
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/createNote").post(verifyJWT, upload.single("contentImage") ,createNote);
router.route("/getNotes").get(verifyJWT, getNotesByUserId);
router.route("/getNote/:noteId").get(verifyJWT, getNote);
router.route("/deleteNote/:noteId").delete(verifyJWT, deleteNote);
router.route("/editNote/:noteId").patch(verifyJWT, upload.single("contentImage"), editNote);
router.route("/pinNote/:noteId").patch(verifyJWT, pinNote);
router.route("/unpinNote/:noteId").patch(verifyJWT, unpinNote);
router.route("/getPinnedNotes").get(verifyJWT, getPinnedNotes);

export default router