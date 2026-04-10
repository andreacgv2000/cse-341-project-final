const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const controller = require('../controllers/servicesController');
const isAuthenticated = require('../middleware/auth');

const validate = [
  body('serviceName').notEmpty(),
  body('price').isNumeric()
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
 *     Service:
 *       type: object
 *       required:
 *         - serviceName
 *         - price
 */

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', isAuthenticated, validate, handle, controller.create);
router.put('/:id', isAuthenticated, validate, handle, controller.update);
router.delete('/:id', isAuthenticated, controller.delete);

module.exports = router;