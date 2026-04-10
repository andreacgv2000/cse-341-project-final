const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const controller = require('../controllers/appointmentsController');
const isAuthenticated = require('../middleware/auth');

const validate = [
  body('customerId').notEmpty(),
  body('serviceId').notEmpty(),
  body('employeeId').notEmpty()
];

const handle = (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
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
 *         customerId: { type: string }
 *         serviceId: { type: string }
 *         employeeId: { type: string }
 *         date: { type: string }
 *         time: { type: string }
 *         status: { type: string }
 *         notes: { type: string }
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', isAuthenticated, validate, handle, controller.create);
router.put('/:id', isAuthenticated, validate, handle, controller.update);
router.delete('/:id', isAuthenticated, controller.delete);

module.exports = router;