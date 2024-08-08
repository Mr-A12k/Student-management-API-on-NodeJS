const mongoose = require('mongoose');

const workSchema = mongoose.Schema({
    company: {
        type: String,
        
    },
    position: {
        type: String,
        
    },
    experience: {
        type: Number,
        
    },
    personal:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'PersonalDetails'
  }
},
//{_id:false}
);

const Work = mongoose.model('Work', workSchema);
module.exports = Work;
