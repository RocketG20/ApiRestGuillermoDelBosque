require('dotenv').config();
const mysql = require('mysql2');
const halson = require('halson');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos con ID:', connection.threadId);
});

function consultarUsuario(req, res) {
    console.log("Iniciando consulta...");
    console.log("NumeroControl recibido:", req.query.NumeroControl);
    let consulta = '';
    let NumeroControl = req.query.NumeroControl;
    if (typeof NumeroControl === 'undefined' || isNaN(NumeroControl)) {
        consulta = 'SELECT * FROM usuarios';
    } else {
        consulta = 'SELECT * FROM usuarios WHERE NumeroControl = ' + NumeroControl;
    }
    console.log("Consulta SQL generada:", consulta);
    connection.query(consulta, function(error, results, fields) {
        if (error) {
            console.error("Error en la consulta SQL:", error);
            return res.json({
                error: "Error en la consulta"
            });
        }
        console.log("Resultados de la consulta:", results);
        if (results && results.length > 0) {
            //res.json(results);
            var resource = halson({resultado: results})
            .addLink('self', `/usuario/${results[0].NumeroControl}`)

            res.json(resource);
        } else {
            res.json({
                mensaje: "No se encontraron registros"
            });
        }
    });
}

function agregarUsuario(req, res) {
    const { NumeroControl, Nombre, Apellido } = req.body;
    const consulta = 'INSERT INTO usuarios (NumeroControl, Nombre, Apellido) VALUES (?, ?, ?)';

    connection.query(consulta, [NumeroControl, Nombre, Apellido], function(error, results, fields) {
        if (error) {
            return res.json({
                error: "Error al agregar el usuario"
            });
        } else {
            res.json({
                mensaje: "Usuario agregado con éxito"
            });
        }
    });
}

function eliminarUsuario(req, res) {
    const { NumeroControl } = req.body;
    const consulta = 'DELETE FROM usuarios WHERE NumeroControl = ?';

    connection.query(consulta, [NumeroControl], function(error, results, fields) {
        if (error) {
            return res.json({
                error: "Error al eliminar el usuario"
            });
        } else {
            res.json({
                mensaje: "Usuario eliminado con éxito"
            });
        }
    });
}

module.exports = {
    consultarUsuario,
    agregarUsuario,
    eliminarUsuario
};
