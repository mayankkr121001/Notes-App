import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Note } from "../models/note.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"

const createNote = AsyncHandler(async (req, res) => {
    const { title, content, color } = req.body;

    // console.log(title, content);

    if (!title || !content) {
        throw new ApiError(400, "Title and Content is required")
    }

    const imagePath = req.file?.path;
    // console.log(imagePath);


    let contentImage;
    if (imagePath) {
        contentImage = await uploadOnCloudinary(imagePath);

        if (!contentImage.url) {
            throw new ApiError(400, "Error while uploading the image on cloudinary")
        }

    }


    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "User is not authorized")
    }

    const note = await Note.create({
        title,
        content,
        creater: userId,
        color: color ? color : null,
        contentImage: contentImage ? contentImage.url : null
    })

    if (!note) {
        throw new ApiError(404, "Something went wrong white creating the note")
    }

    return res
        .status(201)
        .json({ note, message: "Note created successfully" })

})

const getNotesByUserId = AsyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(400, "User is not authorized")
    }

    const notes = await Note.find({ creater: userId })

    if (notes.length === 0) {
        throw new ApiError(404, "No notes found")
    }

    return res
        .status(200)
        .json({ notes, message: "Notes retrieved successfully" })

})

const getNote = AsyncHandler(async (req, res) => {
    const { noteId } = req.params

    if (!noteId) {
        throw new ApiError(400, "Note Id is required")
    }

    const note = await Note.findById(noteId);

    if (!note) {
        throw new ApiError(400, "No note available of given id")
    }
    return res
        .status(200)
        .json({ note, message: "Note retreived successfully" });

})

const deleteNote = AsyncHandler(async (req, res) => {
    const { noteId } = req.params

    if (!noteId) {
        throw new ApiError(400, "Note Id is required")
    }

    const deletedNote = await Note.findByIdAndDelete(noteId)

    if (!deletedNote) {
        throw new ApiError(400, "Something went wrong while deleting the note")
    }

    return res
        .status(200)
        .json({ deletedNote, message: "Note deleted successfully" });
})

const editNote = AsyncHandler(async (req, res) => {
    const {noteId} = req.params
    
    if (!noteId) {
        throw new ApiError(400, "Note Id is required")
    }

    const {title, content, color} = req.body
    const imagePath = req.file?.path;


    let contentImage;
    if (imagePath) {
        contentImage = await uploadOnCloudinary(imagePath);

        if (!contentImage.url) {
            throw new ApiError(400, "Error while uploading the image on cloudinary")
        }

    }

    const editedNote = await Note.findByIdAndUpdate(
        noteId,
        {
            $set:{
                title: title,
                content: content,
                color: color,
                contentImage: contentImage?.url
            }
        },
        {new: true}
    )

    if(!editedNote){
        throw new ApiError(401, "Something went wrong while editing the note")
    }

    return res
    .status(200)
    .json({editedNote, message: "Note edited successfully"})


})

const pinNote = AsyncHandler(async (req, res) =>{
    const {noteId} = req.params;

    if (!noteId) {
        throw new ApiError(400, "Note Id is required")
    }

    const pinnedNote = await Note.findByIdAndUpdate(
        noteId,
        {
            $set:{
                pinned: true
            }
        },
        {new: true}
    )

    if(!pinnedNote){
        throw new ApiError(401, "Something went wrong while pinning the note")
    }

    return res
    .status(200)
    .json({pinnedNote, message: "Note pinned successfully"})
})

const unpinNote = AsyncHandler (async (req, res) =>{
    const {noteId} = req.params;

    if (!noteId) {
        throw new ApiError(400, "Note Id is required")
    }

    const unpinnedNote = await Note.findByIdAndUpdate(
        noteId,
        {
            $set:{
                pinned: false
            }
        },
        {new: true}
    )

    if(!unpinnedNote){
        throw new ApiError(401, "Something went wrong while unpinning the note")
    }

    return res
    .status(200)
    .json({unpinnedNote, message: "Note unpinned successfully"})



})

const getPinnedNotes = AsyncHandler(async (req, res) =>{
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(400, "User is not authorized")
    }

    const pinnedNotes = await Note.find({
        $and : [
            {creater: userId},
            {pinned: true}
        ]
    })

    if (pinnedNotes.length === 0) {
        throw new ApiError(404, "No pinned notes found")
    }

    return res
        .status(200)
        .json({ pinnedNotes, message: "Pinned notes retrieved successfully" })
})

export {
    createNote,
    getNotesByUserId,
    getNote,
    deleteNote,
    editNote,
    pinNote,
    unpinNote,
    getPinnedNotes
}