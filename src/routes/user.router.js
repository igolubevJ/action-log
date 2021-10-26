const { Router } = require('express');

const { check } = require('express-validator');

const { 
  find, 
  create, 
  banned 
} = require('../controllers/user.controller');

const router = Router();

router.get('/users', find);

router.post(
  '/users', 
  check('name')
    .isLength({ min: 3 })
    .withMessage('Minimum name length is 3 characters')
    .isLength({ max: 80 })
    .withMessage('Maximum name length is 80 characters'),
  create);

router.put('/users/:id/banned', banned);

module.exports = router;
