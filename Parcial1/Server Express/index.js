require('dotenv').config();
const express = require('express');
const xmlparser = require('express-xml-bodyparser');
const multer  = require('multer');
const path = require('path');

const routerUsuario = require('./router/usuarioRouter'); // Ajuste aquí

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

app.use('/usuario', routerUsuario); // Asegúrate de usar 'routerUsuario' directamente

app.use((req, res) => {
    res.status(404);
    res.send("error 404");
});

app.listen(port, () => {
    console.log(`corriendo servidor http://localhost:3000`);
});

//hateoas
//instalar hallson, agregar links(rutas a otros metodos?), agredar recursos