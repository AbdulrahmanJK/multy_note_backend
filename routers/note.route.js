
// const {registerValidator} = require("../validation/validation") //потом подключим (Папка готова)
const { Router } = require("express");
const { noteController } = require("../controllers/note.controller.js");
const router = Router();

// Создание заметки
router.post("/makeNote",  noteController.createNote); 

// Обновление заметки по ID
router.post("/updateNote/:id",   noteController.deleteNote); 

// Получение заметки
router.get("/getNote", noteController.getNote)

// Удаление заметки по ID
router.patch("/deleteNote/:id",  noteController.deleteNote)

module.exports = router;