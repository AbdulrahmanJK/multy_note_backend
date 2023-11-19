const Note = require("../models/Note.model");

module.exports.noteController = {
  //Добавление заметки
  createNote: async (req, res) => {
    try {
      const data = await Note.create({
        name: req.body.name,
        title: req.body.title,
        account: req.body.account,
        image: req.body.image,
      });
      return res.json(data);
    } catch (error) {
      res.json(error);
    }
  },

  // Удаление заметки по ID
  deleteNote: async (req, res) => {
    try {
      const data = await Note.findByIdAndRemove(req.params.id);
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },

  // Удаление всех заметок
  deleteAll: async (req, res) => {
    try {
      const data = await Note.deleteMany({});
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },

  // Получение всех заметок
  getNote: async (req, res) => {
    try {
      const data = await Note.find({})
        .populate("accessories")
        .populate("assembling");
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  },
};
