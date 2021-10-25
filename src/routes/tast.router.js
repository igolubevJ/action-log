const { Router } = require('express');
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

router.post('/tasks', create);

router.put('/tasks/:id', update);

router.delete('/tasks/:id', destroy);

module.exports = router;
