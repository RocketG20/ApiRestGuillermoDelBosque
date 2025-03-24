const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const usuarioController = require('../controllers/usuarioController.js');

router.get('/', usuarioController.consultarUsuario);

router.delete('/', usuarioController.eliminarUsuario);

router.post(
    '/',
    [
        // Validación para 'nombre'
        body('Nombre')
            .isLength({ min: 2 })
            .withMessage('El nombre debe tener al menos 2 caracteres'),
        // Validación para 'apellido'
        body('Apellido')
            .isLength({ min: 2 })
            .withMessage('El apellido debe tener al menos 2 caracteres')
    ],
    (req, res, next) => {
        // Verificación de errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        // Si pasa la validación, llamamos al controlador
        usuarioController.agregarUsuario(req, res, next);
    }
);

module.exports = router;
