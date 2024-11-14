
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { type } from "os";



const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowecase:true,
        index:true,
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowecase:true,
        unique:true,
        index:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
      type:String,
      required:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    dp:{
        type:String,
    },
    posts:[
      {
        type:Schema.Types.ObjectId,
        ref:"Post",
      }
    ],
    followers:[
      {
        type:Schema.Types.ObjectId,
        ref:"User",
        
      }
    ],
    followings:[
      {
        type:Schema.Types.ObjectId,
        ref:"User",
        
      }
    ],
    comment:[
      {
        type:Schema.Types.ObjectId,
        ref:"Comment",
        
      }
    ],
    refreshToken:{
        type:String,
    }
},
{
    timestamps:true
}        
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 9)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id : this._id,
    userName: this.userName,
    email : this.email
  },
    "sadfASFAFsfsf",
    {
      expiresIn:"1d"
    })
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id : this._id,
  },
    "sadfASFAFsfsfsadf12dfSFA",
    {
      expiresIn:"10d"
    }
  )
}


export const User = mongoose.model("User",userSchema)