const Note = require("../models/Note.model");
const Folder = require("../models/Folder.model");

module.exports.noteController = {
  createFolder: async (req, res) => {
    try {
      const data = await Folder.create({
        name: req.body.name,
        notes: [],
      });
      return res.json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Удаление папки по ID
  deleteFolder: async (req, res) => {
    try {
      const data = await Folder.findByIdAndRemove(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Получение папки по ID
  getFolder: async (req, res) => {
    try {
      const data = await Folder.findById(req.params.id).populate(
        "notes.account"
      );
      res.json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Получение всех папок
  getAllFolders: async (req, res) => {
    try {
      const data = await Folder.find().populate("notes.account");
      res.json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  patchFolder: async (req, res) => {
    try {
      const { name, id } = req.body;
      const findFolder = await Folder.findById(id);
      if (!findFolder) {
        return res.status(404).json({ error: "Такой заметки не сеществует" });
      }
      findFolder.name = name;

      await findFolder.save();
      res.json({ message: "Заметка успешно изменена", data: findFolder });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // //Добавление заметки
  // createNote: async (req, res) => {
  //   const currentDate = new Date();
  //   const hours = currentDate.getHours();
  //   const minutes = currentDate.getMinutes();
  //   const years = currentDate.getFullYear()
  //   const mounth = currentDate.getMonth()
  //   const day = currentDate.getDate()

  //   try {
  //     const data = await Note.create({
  //       name: req.body.name,
  //       title: req.body.title,
  //       account: req.body.account,
  //       image: req.body.image,
  //       date: `${day}:${mounth}:${years} ${hours}:${minutes}`,
  //     });
  //     return res.json(data);
  //   } catch (error) {
  //     res.json(error);
  //   }
  // },

  // // Удаление заметки по ID
  // deleteNote: async (req, res) => {
  //   try {
  //     const data = await Note.findByIdAndRemove(req.params.id);
  //     res.json(data);
  //   } catch (error) {
  //     res.json(error);
  //   }
  // },

  // // Получение заметки
  // getNote: async (req, res) => {
  //   try {
  //     const data = await Note.findById(req.params.id);

  //     res.json(data);
  //   } catch (error) {
  //     res.json(error);
  //   }
  // },

  // //Получение всех заметок
  // getAllNote: async (req, res) => {
  //   try {
  //     const userId = req.user.id;

  //     const data = await Note.find({ account: userId });

  //     res.json(data);
  //   } catch (error) {
  //     res.json(error);
  //   }
  // },

  // //Изменить заметку
  // patchNote: async (req, res) => {
  //   const currentDate = new Date();
  //   const hours = currentDate.getHours();
  //   const minutes = currentDate.getMinutes();
  //   const years = currentDate.getFullYear()
  //   const mounth = currentDate.getMonth()
  //   const day = currentDate.getDate()
  //   try {
  //     const { name, title, image, account } = req.body;
  //     const findUser = await Note.findById(req.params.id);
  //     if (!findUser) {
  //       return res.status(404).json({ error: "Такой заметки не сеществует" });
  //     }

  //     if (name) {
  //       findUser.name = name;
  //     }
  //     if (title) {
  //       findUser.title = title;
  //     }
  //     if (image) {
  //       findUser.image = image;
  //     }
  //     if (account) {
  //       findUser.account = account;
  //     }
  //     findUser.date = `Изменено ${day}:${mounth}:${years} ${hours}:${minutes}`;

  //     await findUser.save();
  //     res.json({ message: "Заметка успешно изменена", data: findUser });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       error: "Произошла ошибка при обновлении заметки",
  //     });
  //   }
  // },

  // Добавление заметки в папку
  addNoteToFolder: async (req, res) => {
    try {
      const note = new Note({
        name: req.body.name,
        title: req.body.title,
        account: req.body.account,
        image: req.body.image,
        date: new Date(),
      });

      const folder = await Folder.findById(req.params.folderId);
      folder.notes.push(note);
      await folder.save();

      res.json(folder);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Удаление заметки из папки
  deleteNoteFromFolder: async (req, res) => {
    try {
      const folder = await Folder.findById(req.params.folderId);
      folder.notes.id(req.params.noteId).remove();
      await folder.save();

      res.json(folder);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Обновление заметки в папке
  updateNoteInFolder: async (req, res) => {
    try {
      const folder = await Folder.findById(req.params.folderId);
      const note = folder.notes.id(req.params.noteId);

      note.name = req.body.name || note.name;
      note.title = req.body.title || note.title;
      note.image = req.body.image || note.image;
      note.account = req.body.account || note.account;
      note.date = `Изменено: ${new Date()}`;

      await folder.save();
      res.json(note);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
