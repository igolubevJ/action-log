const { Router } = require('express');
const { check } = require('express-validator');

const {
  find,
  findById,
  create,
  update,
  destroy
} = require('../controllers/mission.controller');

const router = Router();

router.get('/missions',find);

router.get('/missions/:id', findById);

router.post(
  '/missions',
  check('title')
    .isLength({ min: 3 })
    .withMessage('Min length title is 3 characters')
    .isLength({ max: 500 })
    .withMessage('Max length title is 500 characters'),
  check('projectId')
    .not()
    .isEmpty()
    .withMessage('Project does not exist'),
  create
);

router.put(
  '/missions/:id',
  check('title')
    .isLength({ min: 3 })
    .withMessage('Min length title is 3 characters')
    .isLength({ max: 500 })
    .withMessage('Max length title is 500 characters'),
  check('projectId')
    .not()
    .isEmpty()
    .withMessage('Project does not exist'),
  update
);

router.delete('/missions/:id', destroy);

module.exports = router;
