const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const controller = require('../controllers/employeesController');
const isAuthenticated = require('../middleware/auth');

const validate = [
  body('name').notEmpty()
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
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name: { type: string }
 *         position: { type: string }
 *         phone: { type: string }
 *         email: { type: string }
 *         hireDate: { type: string }
 *         salary: { type: number }
 *         status: { type: string }
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', isAuthenticated, validate, handle, controller.create);
router.put('/:id', isAuthenticated, validate, handle, controller.update);
router.delete('/:id', isAuthenticated, controller.delete);

module.exports = router;