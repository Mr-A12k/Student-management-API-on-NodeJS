const mongoose = require('mongoose');
const personalDataSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    mobile:{
        type:Number,
        require:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    role :{
        type:String,
        required:true,
        enum:['student','working']
    },
    student:{
        type:mongoose.Schema.ObjectId,
        //required:true,
        ref: 'studentDetails'
    },
    work:{
        type:mongoose.Schema.ObjectId,
        //required:true,
        ref:'workDetails'
    }
});

const PersonalDetails = mongoose.Schema(personalDataSchema,'PersonalDetails');
module.exports(PersonalDetails);