const mongoose = require("mongoose");

const FolderNoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  account:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"User",
    required: true,
  },
  notes: []
});

const Folder = mongoose.model("Folder", FolderNoteSchema);

module.exports = Folder;
