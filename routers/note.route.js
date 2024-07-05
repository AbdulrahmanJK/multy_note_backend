const { Router } = require("express");
const { noteController } = require("../controllers/note.controller.js");
const { auth } = require("../middlewares/checkAuth.js");
const router = Router();

// Маршруты для папок
router.post("/folders", auth, noteController.createFolder); // Создание папки
router.delete("/folders/:id", auth, noteController.deleteFolder); // Удаление папки по ID
router.get("/folders/:id", auth, noteController.getFolder); // Получение папки по ID
router.get("/folders", auth, noteController.getAllFolders); // Получение всех папок
router.patch("/folder", auth, noteController.patchFolder); // Обновление названия папки

// Маршруты для заметок в папках
router.post("/folders/:folderId/notes", auth, noteController.addNoteToFolder); // Добавление заметки в папку
router.delete("/folders/:folderId/notes/:noteId", auth, noteController.deleteNoteFromFolder); // Удаление заметки по ID внутри папки
router.patch("/folders/:folderId/notes/:noteId", auth, noteController.updateNoteInFolder); // Обновление заметки по ID внутри папки

// // Старые маршруты (если все еще нужны)
// router.get("/note/:id", auth, noteController.getNote); // Получение заметки по ID (возможно устаревшее)
// router.get("/notes", auth, noteController.getAllNotes); // Получение всех заметок (возможно устаревшее)

module.exports = router;