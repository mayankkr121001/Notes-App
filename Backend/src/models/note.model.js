import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required:true
        },
        content:{
            type:String,
            // required:true
        },
        contentImage:{
            type:String
        },
        color:{
            type:String
        },
        creater:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        pinned:{
            type: Boolean,
            default: false
        }

    }, {timestamps: true}
)

export const Note = mongoose.model("Note", noteSchema);