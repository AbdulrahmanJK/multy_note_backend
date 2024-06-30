// const {registerValidator} = require("../validation/validation") //потом подключим (Папка готова)
const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const router = Router();
const { auth } = require("../middlewares/checkAuth.js");

// Роут регистрации пользователя
router.post("/auth", userController.registerUser);

// Вход в учетную запись
router.post("/login", userController.login);

//Получить свои данные
router.get("/getMe", auth, userController.getMe);

//Роут для редактирования профиля
router.patch("/patchUser/:id", userController.patchUser);

module.exports = router;

("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWE1NDFmYzc1NWM5ZDllZDUzYTkyZiIsImVtYWlsIjoiZGVuaUBtYWlsLnJ1IiwiaWF0IjoxNzAxMDkxMzE5LCJleHAiOjE3MDEzNTA1MTl9.ji6Gy6YDoWXgxOLQw3_JFvRcK2Dk4ZV9kuYwA4as8wo");
