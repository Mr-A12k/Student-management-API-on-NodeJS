const mongoose = require('mongoose');

const personalDataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'working'],
        default: 'student'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    student: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ,
    work: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Work'
        }
    ]
});

const PersonalDetails = mongoose.model('PersonalDetails', personalDataSchema);
module.exports = PersonalDetails;
