const { Router } = require('express');

const {
  find,
  findById,
  create,
  update,
  destroy
} = require('../controllers/project.controller');

const router = new Router();

router.get('/projects', find);

router.get('/projects/:id', findById);

router.post('/projects', create);

router.put('/projects/:id', update);

router.delete('/projects/:id', destroy);

module.exports = router;
