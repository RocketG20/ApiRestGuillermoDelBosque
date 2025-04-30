const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           example: 1
 *         nombre:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           example: "Ana López"
 *         email:
 *           type: string
 *           format: email
 *           example: "ana@example.com"
 *         activo:
 *           type: boolean
 *           default: true
 *   examples:
 *     UsuarioEjemplo:
 *       value:
 *         id: 1
 *         nombre: "Ana López"
 *         email: "ana@example.com"
 *         activo: true
 *     UsuarioEliminar:
 *       value:
 *         id: 1
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión completa del ciclo de vida de usuarios
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     tags: [Usuarios]
 *     operationId: getUsuarios
 *     summary: Obtener todos los usuarios
 *     description: >
 *       Retorna una lista paginada de todos los usuarios registrados en el sistema.
 *       Puede filtrarse por estado activo/inactivo (parámetro opcional).
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *             example:
 *               - id: 1
 *                 nombre: "Ana López"
 *                 email: "ana@example.com"
 *                 activo: true
 *               - id: 2
 *                 nombre: "Carlos Ruiz"
 *                 email: "carlos@example.com"
 *                 activo: false
 *     x-codeSamples:
 *       - lang: cURL
 *         label: Terminal
 *         source: |
 *           curl -X GET "http://localhost:3000/usuario" \
 *             -H "Accept: application/json"
 *       - lang: JavaScript
 *         label: Fetch API
 *         source: |
 *           fetch('http://localhost:3000/usuario')
 *             .then(response => {
 *               if (!response.ok) throw new Error('Error HTTP: ' + response.status);
 *               return response.json();
 *             })
 *             .then(data => console.log(data))
 *             .catch(err => console.error('Error:', err));
 *       - lang: Python
 *         label: Python Requests
 *         source: |
 *           import requests
 *           response = requests.get('http://localhost:3000/usuario')
 *           if response.status_code == 200:
 *               print(response.json())
 *           else:
 *               print(f"Error: {response.status_code}")
 */
router.get('/', usuarioController.consultarUsuario);

/**
 * @swagger
 * /usuario:
 *   post:
 *     tags: [Usuarios]
 *     operationId: createUsuario
 *     summary: Crear nuevo usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           examples:
 *             ejemploCompleto:
 *               $ref: '#/components/examples/UsuarioEjemplo'
 *             minimoRequerido:
 *               value:
 *                 nombre: "Nuevo Usuario"
 *                 email: "nuevo@example.com"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             example:
 *               id: 3
 *               nombre: "Nuevo Usuario"
 *               email: "nuevo@example.com"
 *               activo: true
 *       400:
 *         description: Datos de entrada inválidos
 *     x-codeSamples:
 *       - lang: cURL
 *         label: Terminal
 *         source: |
 *           curl -X POST "http://localhost:3000/usuario" \
 *             -H "Content-Type: application/json" \
 *             -d '{"nombre":"Nuevo Usuario","email":"nuevo@example.com"}'
 *       - lang: JavaScript
 *         label: Fetch API
 *         source: |
 *           const nuevoUsuario = {
 *             nombre: "Nuevo Usuario",
 *             email: "nuevo@example.com"
 *           };
 *           
 *           fetch('http://localhost:3000/usuario', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json'
 *             },
 *             body: JSON.stringify(nuevoUsuario)
 *           })
 *           .then(response => response.json())
 *           .then(data => console.log(data));
 */
router.post('/', usuarioController.agregarUsuario);

/**
 * @swagger
 * /usuario:
 *   delete:
 *     tags: [Usuarios]
 *     operationId: deleteUsuario
 *     summary: Eliminar usuario existente
 *     description: >
 *       Elimina permanentemente un usuario del sistema.
 *       Requiere el ID del usuario en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 format: int64
 *                 description: ID del usuario a eliminar
 *           examples:
 *             ejemploId:
 *               $ref: '#/components/examples/UsuarioEliminar'
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 usuarioEliminado:
 *                   $ref: '#/components/schemas/Usuario'
 *             example:
 *               mensaje: "Usuario eliminado correctamente"
 *               usuarioEliminado:
 *                 id: 1
 *                 nombre: "Ana López"
 *                 email: "ana@example.com"
 *       404:
 *         description: Usuario no encontrado
 *     x-codeSamples:
 *       - lang: cURL
 *         label: Terminal
 *         source: |
 *           curl -X DELETE "http://localhost:3000/usuario" \
 *             -H "Content-Type: application/json" \
 *             -d '{"id":1}'
 *       - lang: JavaScript
 *         label: Fetch API
 *         source: |
 *           fetch('http://localhost:3000/usuario', {
 *             method: 'DELETE',
 *             headers: {
 *               'Content-Type': 'application/json'
 *             },
 *             body: JSON.stringify({ id: 1 })
 *           })
 *           .then(response => response.json())
 *           .then(data => console.log(data));
 */
router.delete('/', usuarioController.eliminarUsuario);

module.exports = router;