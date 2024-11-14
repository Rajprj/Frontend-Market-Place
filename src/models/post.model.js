import mongoose, { Schema } from "mongoose";

const userPostSchema = new Schema({
    postName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    postCode: {
        type: String,
        required: true,
        trim: true, 
    },
    thumbnail: {
        type: String,
        required: true, 
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    images: [{ url: String }],
    like:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    comment:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }] 
});

// Validation function to 4-image limit
function arrayLimit(val) {
    return val.length <= 4;
}

export const Post = mongoose.model("Post", userPostSchema);
