const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const controller = require('../controllers/servicesController');
const isAuthenticated = require('../middleware/auth');

const validate = [
  body('serviceName').notEmpty().withMessage('Service name is required'),
  body('price').isNumeric().withMessage('Price must be a number')
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - serviceName
 *         - price
 *       properties:
 *         serviceName:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         duration:
 *           type: number
 *         category:
 *           type: string
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', isAuthenticated, validate, handleValidation, controller.create);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', isAuthenticated, validate, handleValidation, controller.update);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', isAuthenticated, controller.delete);

module.exports = router;