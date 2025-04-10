const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/login', function (req, res) {
    try {
        const privada = fs.readFileSync(path.join(__dirname, '/Llaves/privada.pem'), 'utf8');
        const token = jsonwebtoken.sign(req.body, privada, { algorithm: 'RS256' });
        console.log(token);
        res.json({ token });
    } catch (error) {
        console.error('Error al generar el token:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/sistema', verificarToken, function (req, res) {
    res.send('Bienvenido al sistema');
});

app.listen(port, function () {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

function verificarToken(req, res, next) {
    try {
        const publica = fs.readFileSync(path.join(__dirname, '/Llaves/publica.pem'), 'utf8');
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Token no enviado' });
        }
        const token = req.headers.authorization.substring(7);
        jsonwebtoken.verify(token, publica, function (err, decoded) {
            if (err) {
                return res.status(403).json({ error: 'Token inválido' });
            }
            next();
        });
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

app.get('/hello', function (req, res) {
    res.send('Hello World');
});