const mongoose = require("mongoose");

const FolderNoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  notes: []
});

const Folder = mongoose.model("Folder", FolderNoteSchema);

module.exports = Folder;
