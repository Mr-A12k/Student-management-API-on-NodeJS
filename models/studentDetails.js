const mongoose = require("mongoose");
const educationSchema =new mongoose.Schema({
    course:{
        type:String,
        required:true       
    },
    year:{
        type:Number,
        required:true
    },
    rollno:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
},
    { _id: false });

const Student = mongoose.Schema('Student',educationSchema);
module.exports(Student);
