const mongoose = require("mongoose");
const PersonalDetails = require("./personalDetails");

const studentSchema = mongoose.Schema({
    currectCourse: { type: String },
    eduHistory: {
        tenth: {
            yearOfpassing: { type: Number },
            instituteName: { type: String },
            marks: { type: Number }
        },
        twelth: {
            yearOfpassing: { type: Number },
            instituteName: { type: String },
            marks: { type: Number }
        },
        diploma: {
            yearOfpassing: { type: Number },
            instituteName: { type: String },
            marks: { type: Number }
        },
        degree: {
            yearOfpassing: { type: Number },
            instituteName: { type: String },
            marks: { type: Number }
        },
        masterDegree: {
            yearOfpassing: { type: Number },
            instituteName: { type: String },
            marks: { type: Number }
        },
        personal:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'PersonalDetails'
        }
    }
}, 
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;