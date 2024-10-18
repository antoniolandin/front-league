const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');

const {
    registerCommerce,
    updateCommerce,
    getAllCommerces,
    getCommerce,
    deleteCommerce
} = require('../controllers/merchants');
const { registerCommerceValidator, updateCommerceValidator } = require('../validators');

router.post('/', authMiddleware, checkRol(["admin"]), registerCommerceValidator,  registerCommerce);

router.put('/:id', authMiddleware, checkRol(["admin"]),  updateCommerceValidator, updateCommerce);

/**
 * @openapi
 * /api/merchants:
 *  get:
 *      tags:
 *      - Merchants
 *      summary: "Get all merchants"
 *      description: "Get all merchants"
 *
 *      responses:
 *          '200':
 *              description: Returns the list of merchants
 *          '500':
 *              description: Internal server error
 *      security:
 *          - bearerAuth: []
 */
router.get('/', authMiddleware, checkRol(["admin"]), getAllCommerces);

/**
 * @openapi
 * /api/merchants/{id}:
 *  get:
 *      tags:
 *      - Merchants
 *      summary: Get a merchant
 *      description: Get a merchant by id
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the merchant
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *           '200':
 *              description: Returns the merchant
 *           '404':
 *              description: Merchant not found
 *           '400':
 *               description: 'Invalid ID supplied'
 *           '500':
 *               description: Internal server error
 *      security:
 *          - bearerAuth: []
 */
router.get('/:id', authMiddleware, checkRol(["admin"]), getCommerce);
router.delete('/:id', authMiddleware, checkRol(["admin"]), deleteCommerce);

module.exports = router;
