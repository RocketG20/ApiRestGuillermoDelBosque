const express = require('express');
const path = require('path');
const modulo = require('./src/modulo.js');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Pruebas',
            version: '1.0.0',
        },
        servers: [
            { url: "http://localhost:3000" }
        ],
    },
    apis: [`${path.join(__dirname, "./routes/ruta_empleado.js")}`],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

console.log(modulo.suma(5, 3));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});