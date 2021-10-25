const { Router } = require('express');

const {
  find,
  findById,
  create,
  update,
  destroy
} = require('../controllers/mission.controller');

const router = Router();

router.get('/missions', find);

router.get('/missions/:id', findById);

router.post('/missions', create);

router.put('/missions/:id', update);

router.delete('/missions/:id', destroy);

module.exports = router;
