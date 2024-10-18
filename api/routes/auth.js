const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const { registerUserValidator, loginValidator } = require('../validators');

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - User
 *      summary: "User register"
 *      description: Register a new user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/register"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post('/register', registerUserValidator, register);

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - User
 *      summary: "User login"
 *      description: Login a user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post('/login', loginValidator, login);

module.exports = router;
