import mongoose, { Schema } from "mongoose";

const userPostSchema = new Schema({
    postName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
    images: [{ url: String }]
});

// Validation function to 4-image limit
function arrayLimit(val) {
    return val.length <= 4;
}

export const Post = mongoose.model("UserPost", userPostSchema);
