import mongoose,{Schema} from "mongoose";

const commentsSchema = new Schema({
    commentText:{
        type:String,
        required: true,
        trim: true,
        index: true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }
},{timestamps:true})


export const Comment = mongoose.model("Comment", commentsSchema)