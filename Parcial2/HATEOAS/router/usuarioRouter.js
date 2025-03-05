const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

router.get('/', usuarioController.consultarUsuario);

router.delete('/', usuarioController.eliminarUsuario);

router.post('/', usuarioController.agregarUsuario);

module.exports = router;
