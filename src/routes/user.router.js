const { Router } = require('express');

const { 
  find, 
  create, 
  banned 
} = require('../controllers/user.controller');

const router = Router();

router.get('/users', find);

router.post('/users', create);

router.put('/users/:id/banned', banned);

module.exports = router;
