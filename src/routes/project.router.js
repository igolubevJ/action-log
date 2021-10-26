const { Router } = require('express');
const { check } = require('express-validator');
const { authProtect } = require('../middleware/protect-route.middleware');

const {
  find,
  findById,
  create,
  update,
  destroy
} = require('../controllers/project.controller');

const router = new Router();

router.get('/projects', authProtect, find);

router.get('/projects/:id', authProtect, findById);

router.post(
  '/projects',
  authProtect,
  check('title')
    .isLength({ min: 3 })
    .withMessage('Min length title is 3 characters')
    .isLength({ max: 350 })
    .withMessage('Max length title is 350 characters'),
  create
);

router.put(
  '/projects/:id',
  authProtect,
  check('title')
    .isLength({ min: 3 })
    .withMessage('Min length title is 3 characters')
    .isLength({ max: 350 })
    .withMessage('Max length title is 350 characters'),
  update
);

router.delete('/projects/:id', destroy);

module.exports = router;
