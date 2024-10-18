const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/admin');
const { loginValidator } = require('../validators');

/**
 * @openapi
 * /api/admin/login:
 *  post:
 *      tags:
 *      - Admin
 *      summary: "Admin login"
 *      description: Login an admin
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login_admin"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post('/login', loginValidator, login);

// Ruta para los tests
router.post('/register', register);

module.exports = router;
