const mongoose = require('mongoose');

const workSchema = mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
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
