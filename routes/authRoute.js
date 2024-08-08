const express = require('express');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userDetails');
const router = express.Router();        

router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user = await User.findOne({username});
        if(!user){
            res.status(404).json({message:"user not found!"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(500).json({message:"Invalid password!"});
        }
        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECTRET_KEY,{expiresIn:'600s'});
        res.status(200).json({token});
    }
    catch(error){

    }
});

module.exports=router;