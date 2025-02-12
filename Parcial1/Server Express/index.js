const express = require('express');
const app = express();
const port = 3000;
xmlparser = require('express-xml-bodyparser');

app.use('/', (req, res, next) => {
    console.log("Peticion al servidor");
    next();
}, (req, res, next) => {
    console.log("funcion middleware");
    next();
});

app.use(express.json());
app.use(express.text());
app.use(xmlparser());

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

app.use((req, res, next) => {
    res.status(404);
    res.send('Error 404');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});