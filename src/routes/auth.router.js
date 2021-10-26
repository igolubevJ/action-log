const { Router } = require('express');
const { check } = require('express-validator');

const { signin } = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/auth/signin', 
  check('id')
    .not()
    .isEmpty(), 
  check('password')
    .isLength({ min: 5 }),
  signin
);

module.exports = router;
