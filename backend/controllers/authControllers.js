const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.signup = async (req,res) =>{
    try{
        const {name, email, password, role } = req.body;
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message:"User already exist"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        user = new User({name, email, password:hashedPassword, role});
        await user.save();

        res.status(201).json({message:"User registerd successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.login = async (req, res) =>{
    try{
        const {email,password } = req.body;

        const user =  await User.findOne({email});
        if(!isMatch) return res.status(400).json({message:"User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:"invalid credentials"});

        const token = jwt.sign({userId:user._id, role: user.role},process.env.JWT_SECRET,{expireIn: '1hr'});

        res.json({token});

    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.getProfile = async (req,res)=>{
    try{
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};