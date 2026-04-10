const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const controller = require('../controllers/employeesController');
const isAuthenticated = require('../middleware/auth');

const validate = [
  body('name').notEmpty().withMessage('Name is required')
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
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         position:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         hireDate:
 *           type: string
 *         salary:
 *           type: number
 *         status:
 *           type: string
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get employee by ID
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
 * /employees:
 *   post:
 *     summary: Create employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', isAuthenticated, validate, handleValidation, controller.create);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', isAuthenticated, validate, handleValidation, controller.update);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete employee
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