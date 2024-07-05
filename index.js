require("dotenv").config()
const express = require("express")
const cors = require('cors');

const app = express()

var whitelist = ['http://localhost:3000']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions));
const mongoose = require("mongoose")

const port = 4000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

app.use(express.json());

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(require('./routers/user.route'))
app.use(require('./routers/note.route'))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});





mongoose
    .connect(process.env.SERVER)
    .then(() => {
        console.log("Запуск сервера");
        app.listen(port, () => {
            console.log(`Сервер запушен на порту ${port}`);
        })
    })
    .catch((err) => {
        console.log("ОШИБКА:", err);
    })