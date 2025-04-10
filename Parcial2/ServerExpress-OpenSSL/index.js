const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const options = {
 key: fs.readFileSync(path.join(__dirname,'Llaves/key.pem')),
 cert: fs.readFileSync(path.join(__dirname,'Llaves/cert.pem')),
};

app.get('/',(req,res)=>{
 res.json({mensaje:"Servidor Express contestando"})
})

https.createServer(options,app).listen(3000,()=>{
 console.log("Servidor Express escuchando en 3000");
})