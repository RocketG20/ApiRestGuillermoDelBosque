require('dotenv').config();
const express = require('express');
const winston = require('winston');
const halson = require('halson');
const pug = require('pug');
const xmlparser = require('express-xml-bodyparser');
const multer  = require('multer');
const path = require('path');

const routerUsuario = require('./router/usuarioRouter');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: __dirname+'logs/error.log'})
    ]
});

const app = express();
const port = process.env.PORT;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/hola', (req, res, next)=>{
    res.render('holamundo')
})

//middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

app.use('/usuario', routerUsuario);

app.use((req, res) => {
    res.status(404);
    res.send("error 404");
});

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`¡Error detectado!\nError: ${err.message}`);
    logger.error(err.message, { stack: err.stack });
});

app.listen(port, () => {
    console.log(`corriendo servidor http://localhost:3000`);
});