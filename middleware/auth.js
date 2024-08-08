// const jwt = require('jsonwebtoken');
// const User = require('../models/userDetails');

// const authenticate = (req, res, next)=>{
//  const token = req.headers['authorization']
//  //&&req.headers['authorization'].startWith('Bearer')?req.headers['authorization'].split(' ')[1]:null;
//     if (!token) {
//         res.status(403).json({ message: "No token provided!" });
//     }
//     jwt.verify(token, process.env.JWT_SECTRE_KEY, (err,decoded)=> {
//     if (err) {
//         res.status(500).json({ message: "failed to validate token" })
//     }
//     req.userId =decoded.id;
//     req.userRole=decoded.role;
//     next();
// });
// };

// const isAdmin = (req,res,next)=>{
//     if(req.userRole !== 'admin'){
//         res.status(403).json({message:"Admin role require for this action!"});
//     }
//     next();
// }

// const isUser =(req,res,next)=>{
//     if(req.userId!=='user'){
//         res.status(403).json({message:"User role require for this action!"});
//     }
//     next();
// }

// module.exports={authenticate,isAdmin,isUser};

const jwt = require('jsonwebtoken');
const User = require('../models/userDetails');
require('dotenv').config();
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader
    // && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    console.log(token, process.env.JWT_SECRET_KEY,authHeader," :  decoded")
    jwt.verify(token, '9574c048f727975a5b7d30e7aee6bee0e1a40dd82157c8ab241ded2e068cc47c', (err, decoded) => {
        console.log(err, decoded)
        if (err) {
            return res.status(500).json({ message: "Failed to authenticate token" });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: "Admin role required for this action!" });
    }
    next();
};

const isUser = (req, res, next) => {
    if (req.userRole !== 'user') {
        return res.status(403).json({ message: "User role required for this action!" });
    }
    next();
};

module.exports = { authenticate, isAdmin, isUser };