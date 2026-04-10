const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const controller = require('../controllers/appointmentsController');
const isAuthenticated = require('../middleware/auth');

const validate = [
  body('customerId').notEmpty().withMessage('Customer ID required'),
  body('serviceId').notEmpty().withMessage('Service ID required'),
  body('employeeId').notEmpty().withMessage('Employee ID required')
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
 *     Appointment:
 *       type: object
 *       required:
 *         - customerId
 *         - serviceId
 *         - employeeId
 *       properties:
 *         customerId:
 *           type: string
 *         serviceId:
 *           type: string
 *         employeeId:
 *           type: string
 *         date:
 *           type: string
 *         time:
 *           type: string
 *         status:
 *           type: string
 *         notes:
 *           type: string
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
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
 * /appointments:
 *   post:
 *     summary: Create appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', isAuthenticated, validate, handleValidation, controller.create);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', isAuthenticated, validate, handleValidation, controller.update);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete appointment
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