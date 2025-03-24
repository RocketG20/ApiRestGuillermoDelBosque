const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/login', function (req, res, next) {
    const token = jsonwebtoken.sign(req.body, 'claveSecreta');
    console.log(token);
    res.json({ token });
});

app.get('/sistema', verificarToken, function (req, res, next) {
    res.send('Bienvenido al sistema');
});

app.listen(3000, function () {
    console.log('Servidor iniciado en el puerto 3000');
});

function verificarToken(req, res, next) {
    console.log(req.headers.authorization);
    if (typeof req.headers.authorization === 'undefined') {
        res.json({ error: 'Token no enviado' });
    } else {
        const token = req.headers.authorization.substring(7, req.headers.authorization.length);
        jsonwebtoken.verify(token, 'claveSecreta', function (err, decoded) {
            if (err) {
                res.json({ error: 'Token invalido' });
            } else {
                next();
            }
        });
    }
}

app.get('/hello', function (req, res) {
    res.send('Hello World');
});