const { models } = require('mongoose');
const mongoose = require('mongoose');
const WorkSchema = new mongoose.Schema({
     company:{
        type:String,
        required:true
     },
     positon:{
        type:String,
        required:true
     },
     experience:{
        type:Number,
        required:true
     }
});

const Work = mongoose.Schema(WorkSchema,'Work');
module.exports=Work;