const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const questionValidation = require('../../validations/question.validation');
const questionController = require('../../controllers/question.controller');
// const question = require('../../middlewares/question');

const router = express.Router();

router
  .route('/').
  post( auth('createQuestion'), /*  validate(questionValidation.register),*/ questionController.createQuestion)
  .get(questionController.getQuestions);
// router.post('/login', /*validate(questionValidation.login),*/ questionController.login);
// router.post('/logout', validate(questionValidation.logout), questionController.logout);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Question
 *   description: Question
 */

/**
 * @swagger
 * /question:
 *   post:
 *     summary: Create question
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               tags:
 *                 type: array
 *                 format: password
 *                 minLength: 8
 *                 description: Array of tag ids
 *             example:
 *               title: How to clone Stackoverflow
 *               body: I received a coding challenge on cloning stackoverflow, i have created the express app but i am having challenges with the reddis....
 *               tags: [23553s5etcydryfvt]
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   $ref: '#/components/schemas/Question'
 *                
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 * 
 *   get:
 *     summary: Get all questions
 *     description:  retrieve all questions.
 *     tags: [Question]
 *     
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Question name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Question role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of questions
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

