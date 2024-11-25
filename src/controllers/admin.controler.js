import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comments.model.js";
import { asyncHandler } from "../utils/asyncHendler.js";
import nodemailer from "nodemailer";
import { Contact } from "../models/contact.model.js";



// For add new Admin
const addAdmin = asyncHandler(async (req, res) => {
    const { userName, email, fullName, password } = req.body;

    //check all fields are filled 
    if ([userName, email, fullName, password].some((fields) => fields?.trim() === "")) {
        req.session.errorMessage = "All fields are required!"
        return res.redirect("/admin");
    }

    //check if admin already exist
    const existedAdmin = await User.findOne({
        $or: [{ userName }, { email }],
    })
    if (existedAdmin) {
        // throw new apiError(404," already exist")
        req.session.errorMessage = "Admin already exists";
        return res.redirect("/admin");

    }

    // create admin
    const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        email,
        password,
        role: "admin"
    });

    if (!user) {
        req.session.errorMessage = "Something went wrong while adding new admin!"
        return res.redirect("/admin")
    }

    res.redirect("/admin");
})

//For edit Admin profile details
const editProfile = asyncHandler(async (req, res) => {
    try {
        const { userName, email, fullName } = req.body;
        if ([userName, email, fullName].some((fields) => fields?.trim() === "")) {
            req.session.errorMessage = "Pleace fill the All fields"
            return res.redirect("/admin")
        }

        const existAdmin = await User.findOne({
            $or: [{ userName }, { email }],
            _id: { $ne: req.user._id }
        })
        if (existAdmin) {
            req.session.errorMessage = "Admin already exist!"
            return res.redirect("/admin")
        }



        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    userName: userName.toLowerCase(),
                    email,
                    fullName
                },
            },
            { new: true }
        );

        res.redirect("/admin");
    } catch (error) {
        req.session.errorMessage = "Server error while updating the profile, Please wait!"
        return redirect("/admin")
    }
})

//For edit user profile details
const editUserProfile = asyncHandler(async (req, res) => {
    try {
        const { userId, userName, fullName, email, role } = req.body;

        const findUser = await User.findById(userId);
        if (!findUser) {
            req.session.errorMessage = "User not found!";
            return res.redirect("/admin");

        }
        // check if fields are empty
        const updateFields = {};
        if (userName) {
            const existedUser = await User.findOne({
                userName,
                _id: { $ne: userId }
            })
            if (existedUser) {
                req.session.errorMessage = "Username is already exist!";
                return res.redirect("/admin");
            }
            else {
                updateFields.userName = userName
            }
        }
        if (fullName) updateFields.fullName = fullName
        if (email) {
            const existedUser = await User.findOne({
                email,
                _id: { $ne: userId }
            })
            if (existedUser) {
                req.session.errorMessage = "Email is already exist!";
                return res.redirect("/admin");
            } else {
                updateFields.email = email
            }
        }
        if (role) {
            if (role == "viewer") {
                if (findUser.posts.length > 0) {
                    req.session.errorMessage = "First delete user's posts";
                    return res.redirect("/admin");
                }
            }
            updateFields.role = role
        }
        // console.log(updateFields);

        await User.updateOne({ _id: findUser._id }, { $set: updateFields })
            .then(result => {
                req.session.successMsg = "User successfully edited"
                res.redirect("/admin")
            })
            .catch(error => {
                req.session.errorMessage = "Something went wrong while updating the user"
                res.redirect("/admin")
            });
    } catch (error) {
        req.session.errorMessage = "Server error while updating the profile, Please wait!"
        return res.redirect("/admin")
    }
})
//For delete user
const removeUser = asyncHandler(async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id).populate({ path: 'followers', }).populate({ path: 'followings' }).populate({ path: 'ownLike' }).populate({ path: 'comment' })


        // console.log(findUser.comment);

        if (!findUser) {
            req.session.errorMessage = "User not found!"
            return res.redirect("/admin")
        }
        else {
            if (findUser.posts.length > 0) {
                res.json({ success: false, errMsg: "First delete user's post!" });
            }
            else {

                if (findUser.followings.length > 0) {
                    await Promise.all(
                        findUser.followings.map(async (following) => {
                            following.followers = following.followers.filter(
                                (followerId) => !followerId.equals(findUser._id)
                            );
                            await following.save();
                        })
                    );
                }

                if (findUser.followers.length > 0) {
                    await Promise.all(
                        findUser.followers.map(async (follower) => {
                            follower.followings = follower.followings.filter(
                                (followingId) => !followingId.equals(findUser._id)
                            );
                            await follower.save();
                        })
                    );
                }
                if (findUser.ownLike.length > 0) {
                    await Promise.all(
                        findUser.ownLike.map(async (post) => {
                            post.like = post.like.filter(
                                (likeId) => !likeId.equals(findUser._id)
                            )
                            await post.save();
                        })
                    )
                }
                if (findUser.comment.length > 0) {   
                    for (const eachComment of findUser.comment) {
                        const comm = await Comment.findById(eachComment._id).populate('post');
                        
                        if (comm && comm.post) {
                            
                            comm.post.comment = comm.post.comment.filter((id) => !id.equals(comm._id));
                            
                            
                            await comm.post.save();
                            
                            
                            await Comment.deleteOne({ _id: comm._id });
                        }
                    }
                }
                
                await User.deleteOne(findUser._id);
                let success = true;
                res.json({ success: true });
            }
        }
    } catch (error) {
        res.json({ success: false, errMsg: "Something went wrong while removeing the user!" });
    }
})
//For delete contact
const removeContact = asyncHandler(async (req, res) => {
    try {
        const findContact = await Contact.findById(req.params.id)
        if (!findContact) {
            res.json({ success: false, errMsg: "Contact not found!" });
        }
        else {
                
                await Contact.deleteOne(findContact._id);
                let success = true;
                res.json({ success: true });
            }
        } catch (error) {
       
        res.json({ success: false, errMsg: "Something went wrong while removing the Contact!" });
    }
})

//For send mail
const sendMail = asyncHandler(async (req, res) => {
    const { email, msg } = req.body; 
    // console.log(email);

    let config = {
        service: "gmail",
        auth: {
            user: "frontendmarketplace561@gmail.com",
            pass: "vgkv eepf vzij swij" 
        }
    };

    let transporter = nodemailer.createTransport(config);

    // Email message options
    let message = {
        from: "frontendmarketplace561@gmail.com",
        to: email,
        subject: "Frontend Marketplace Notification",
        text: msg
    };

    // Send email
    transporter.sendMail(message).then(() => {
        req.session.successMsg = "Successfully send mail"
        res.redirect("/admin")
    }).catch((error) => {
        console.error("Error sending email:", error);
        req.session.errorMessage = "Failed to send mail!"
        res.redirect("/admin")
    });

})

//For user post delete
const deleteUserpost = asyncHandler(async (req, res) => {
    const userPost = await Post.findById(req.params.id);
    if (!userPost) {
        res.json({ success: false, errMsg: "Post not found!" });
    }
    console.log(userPost._id);
    const user = await User.findById(userPost.user._id);
    console.log(user._id);

    user.posts = user.posts.filter(
        (postId) => !postId.equals(userPost._id)
    );
    // user.posts.splice(userPost._id, 1);
    
    
    await Post.deleteOne({ _id: userPost._id });
    user.save({ validateBeforeSave: true })

    res.redirect("/admin")
})


export {
    addAdmin,
    editProfile,
    removeUser,
    editUserProfile,
    sendMail,
    deleteUserpost,
    removeContact
}