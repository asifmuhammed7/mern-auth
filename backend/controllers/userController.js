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
    res.status(200).json({message:'User profile'})
})

const updateUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({messsage:'Update User Profile'})
})





export {authUser,
registerUser,
logoutUser,
getUserProfile,updateUserProfile
}