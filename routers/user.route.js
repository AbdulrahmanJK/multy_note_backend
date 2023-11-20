
// const {registerValidator} = require("../validation/validation") //потом подключим (Папка готова)
const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const router = Router();

router.post("/auth",  userController.registerUser); // Роут регистрации пользователя
router.post("/login",   userController.login); // Вход в учетную запись
// router.get("/getMe", userController.getMe)
router.patch("/patchUser/:id",  userController.patchUser)//Роут для редактирования профиля
router.get("", userController.getHello)
module.exports = router;