const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req, res, next)=>{
    const token = req.headers['authorization'];
    if (!token) {
        res.status(403).json({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.JWT_SECTRE_KEY, (err,decoded)=> {
    if (err) {
        res.status(500).json({ message: "failed to validate token" })
    }
    req.userId =decoded.id;
    req.userRole=decoded.role;
    next();
});
};

const isAdmin = (req,res,next)=>{
    if(req.userRole !== 'admin'){
        res.status(403).json({message:"Admin role require for this action!"});
    }
    next();
}

const isUser =(req,res,next)=>{
    if(req.userId!=='user'){
        res.status(403).json({message:"User role require for this action!"});
    }
    next();
}

module.exports={authenticate,isAdmin,isUser};