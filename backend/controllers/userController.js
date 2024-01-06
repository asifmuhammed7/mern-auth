import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
const authUser = asyncHandler(async(req,res) =>{
   const {email,password} = req.body;

   const user = await User.findOne({email})
   
   if(user && user.matchPassword(password)){
    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email: user.email
    })
}else{
    res.status(401)
    throw new Error('invalid email or password')
}
    res.status(200).json({message:'Auth  User'})
})

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }

    console.log(req.body);
    res.status(200).json({ message :'Register User'})
})

//logout user
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date()
    })
    res.status(200).json({message:'user logout User'})
})

//user profile
const getUserProfile = asyncHandler(async(req,res)=>{
    console.log(req.user)
    const user  ={
        _id:req.user._id,
        name:req.user.name,
        email:req.uaer.email
    }
    res.status(200).json(user)
})

const updateUserProfile = asyncHandler(async(req,res)=>{
   const user = await User.findById(req.user._id);
   if(user){
    user.name = req.body.name  || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
        user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
    })
    }else{
    res.status(404)
    throw new Error('User not found')
   }
    res.status(200).json({messsage:'Update User Profile'})
})





export {authUser,
registerUser,
logoutUser,
getUserProfile,updateUserProfile
}