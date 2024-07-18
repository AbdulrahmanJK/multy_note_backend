const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    required: false, 
  },
  title: {
    type: String,
    default: "",
    required: false, 
  },
  image:{
    type:String,
    required: false, 
  },
  
  date: {
    type: String
  }
});


const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
