require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 4000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
app.use(express.json());


app.use(require('./routers/user.route'))
app.use(require('./routers/note.route'))
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


mongoose
.connect(process.env.SERVER)
.then(()=>{
    console.log("Запуск сервера");
    app.listen(port, () =>{
        console.log("Сервер запушен");
    })
})
.catch((err)=>{
    console.log("ОШИБКА:",err);
})