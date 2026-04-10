const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const controller = require('../controllers/usersController');
const isAuthenticated = require('../middleware/auth');

const validate = [
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail()
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
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         firstName: { type: string }
 *         lastName: { type: string }
 *         email: { type: string }
 *         password: { type: string }
 *         role: { type: string }
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
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
 * /users:
 *   post:
 *     summary: Create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', isAuthenticated, validate, handle, controller.create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', isAuthenticated, validate, handle, controller.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
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