const { User } = require("../models/userSchema");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async(req,res)=>{
    try{
        const {fullName, userName, password, confirmPassword, gender} = req.body;
        
        // basic validation
        if(!fullName || !userName || !password || !confirmPassword || !gender){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields !!!"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password does not match !!!"
            })
        }

        //check user exist or not

        const existingUser = await User.findOne({userName});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist !!!"
            })
        }

        // hashing of password

        const hashedPassord = await bycrypt.hash(password, 16);

        // profilePhoto
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const user = await new User({
            fullName,
            userName,
            password:hashedPassord,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender 
        })

        await user.save();

        return res.status(201).json({
            success:true,
            message:"User created successfully !!!",
            user
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User not created successfully !!!",
            err
        })
    }
}


exports.loginUser = async(req, res)=>{
    try{
        const {userName, password} = req.body;

        // basic validation
        if(!userName || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields !!!"
            })
        }

        const user = await User.findOne({userName})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found or Email or Passwords are incorrect !!!"
            })
        }

        //match password

        const isMatch = await bycrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Password is incorrect !!!"
            })
        }

        //generate token

        const tokenData ={
            userId : user._id
        }

        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"1d"});

        //set the token in browser cookie

        return res.cookie("accessToken",token,{
            httpOnly:true,
            expires:token.expiresIn,
            sameSite: 'strict'
        }).status(200).json({
            success:true,
            message:`Welcome ${user.fullName} !!`,
            user,
            token
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Username or Password is incorrect !!!",
            err
        })
    }
}


exports.logoutUser = async(req,res)=>{
    try{
        res.clearCookie("accessToken",{
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });


        return res.status(200).json({
            success:true,
            message:"Logged out successfully !!"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Logout failed !!",
            err
        })
    }
}


//get other users

exports.getOtherUsers = async(req,res)=>{
    try{
        const loggedInUserId = req.id;
        const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        return res.status(200).json({
            success:true,
            message:"Other users fetched successfully !!",
            otherUsers
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to fetch other users !!",
            err
        })
    }
}