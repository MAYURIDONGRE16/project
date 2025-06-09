import User from "../models/User.js";
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

// Register User:/api/user/register
export const register=async (req,res)=>{
    try{

        const{name,email,password}=req.body;

        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }

        const existingUser=await User.findOne({email})

        if(existingUser)
            return res.json({success:false,message:'User alredy exists'})

        const hashedPassword=await bcrypt.hash(password,10)

        const user=await User.create({name,email,password:hashedPassword})

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true, 
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge:7 * 24 * 60 * 60 * 1000,
        })

        return res.json({success:true ,user:{email:user.email,name:user.name}})

    }catch(error){

        console.log(error.message);
        res.json({success:false,message: error.message});

    }
}

// Login User :/api/user/login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.json({ success: false, message: 'Email and password are required' });

        const user = await User.findOne({ email });

        if (!user)
            return res.json({ success: false, message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.json({ success: false, message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, user: { email: user.email, name: user.name } });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// check auth: /api/user/is-auth

export const isAuth = async (req, res) => {
    try {
        const userId = req.user;
        console.log("4. isAuth: User ID retrieved from req.user:", userId);

        if (!userId) {
            console.log("isAuth: User ID not found in req.user. This means authUser didn't set it or wasn't called.");
            return res.json({ success: false, message: "User ID not found after authentication." });
        }

        // Assuming User model is imported correctly and connected to DB
        console.log(`isAuth: Attempting to find user with ID: ${userId}`);
        const user = await User.findById(userId).select("-password"); // Check your User model and DB connection

        if (!user) {
            console.log(`isAuth: No user found in database for ID: ${userId}`);
            return res.json({ success: false, message: "User not found in database." });
        }

        console.log("5. isAuth: User found:", user.username);
        return res.json({ success: true, user });
    } catch (error) {
        console.error("isAuth: Error in function execution:", error.message);
        res.json({ success: false, message: `Error in checking authentication: ${error.message}` });
    }
    console.log("--- isAuth Function End ---");
};


// logout user :api/user/logout

export const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true, 
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
           
        });

        return res.json({success :true ,message :"Logged Out"})
    }catch(error){
        console.log(error.message);
        res.json({success:false,message: error.message});
    }
}


