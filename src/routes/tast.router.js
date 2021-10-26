const { Router } = require('express');

const { check } = require('express-validator');

const {
  find,
  findById,
  create,
  update,
  destroy
} = require('../controllers/task.controller');

const router = Router();

router.get('/tasks', find);

router.get('/tasks/:id', findById);

router.post(
  '/tasks', 
  check('title')
    .isLength({ min: 3 })
    .withMessage('Min length title is 3 characters')
    .isLength({ max: 300 })
    .withMessage('Max length title is 300 characters'),
  check('content')
    .isLength({ min: 3 })
    .withMessage('Min length content is 3 characters')
    .isLength({ max: 2000 })
    .withMessage('Max length content is 2000 characters'),
  check('missionId')
    .not()
    .isEmpty()
    .withMessage('Mission does not exist'),
  check('executorId')
    .not()
    .isEmpty()
    .withMessage('Executor does not exist'),
  check('deadline')
    .isDate()
    .withMessage('Deadline must be Date')
    .not()
    .isEmpty()
    .withMessage('Deadline does not exist'),
  create
);

router.put(
  '/tasks/:id', 
  check('title')
    .isLength({ min: 3 })
    .withMessage('Min length title is 3 characters')
    .isLength({ max: 300 })
    .withMessage('Max length title is 300 characters'),
  check('content')
    .isLength({ min: 3 })
    .withMessage('Min length content is 3 characters')
    .isLength({ max: 2000 })
    .withMessage('Max length content is 2000 characters'),
  check('executorId')
    .not()
    .isEmpty()
    .withMessage('Executor does not exist'),
  check('deadline')
    .isDate()
    .withMessage('Deadline must be Date')
    .not()
    .isEmpty()
    .withMessage('Deadline does not exist'),
  update
);

router.delete('/tasks/:id', destroy);

module.exports = router;
