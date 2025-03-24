const express = require('express');
const bearerToken = require('express-bearer-token');

const app = express();
const port = 3000;

app.use(bearerToken());
app.use(function (req, res, next) {
    if(req.token === 'token123'){
        next();
    }else{
        res.status(401).json({error: 'Token invalido'});
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});