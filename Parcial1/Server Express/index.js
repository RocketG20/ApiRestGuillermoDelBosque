const express = require('express');
const multer = require('multer');
const path = require('path');
const xmlparser = require('express-xml-bodyparser');
const app = express();
const port = 3000;

// Definir una ruta para almacenar archivos que se envían del cliente
const folder = path.join(__dirname, '/archivos/');
const upload = multer({ dest: folder });

// Middleware para registrar peticiones al servidor
app.use('/', (req, res, next) => {
    console.log("Petición al servidor");
    next();
}, (req, res, next) => {
    console.log("Función middleware");
    next();
});

// Middleware para parsear JSON, texto y XML
app.use(express.json());
app.use(express.text());
app.use(xmlparser());

// Middleware para manejar la subida de archivos y formularios
app.use(upload.single('archivo')); // Para manejar un archivo en el formulario
// app.use(upload.none()); // Para manejar formularios sin archivos

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar la cadena de consulta
app.get('/consulta', (req, res) => {
    const queryParams = req.query;
    res.json({
        mensaje: 'Datos de la cadena de consulta recibidos',
        queryParams
    });
});

// Ruta para manejar parámetros de ruta
app.get('/usuario/:id', (req, res) => {
    const idUsuario = req.params.id;
    res.json({
        mensaje: 'Datos de la ruta recibidos',
        idUsuario
    });
});

// Ruta para manejar la recepción de formularios y archivos
app.post('/usuario/', (req, res) => {
    if (req.file) {
        console.log(`Se recibió el archivo: ${req.file.originalname}`);
    }
    console.log(req.body);
    console.log('Se recibió el formulario:' + JSON.stringify(req.body));
    res.json(req.body);
});

// Middleware para manejar errores 404
app.use((req, res, next) => {
    res.status(404);
    res.send('Error 404');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:3000`);
});