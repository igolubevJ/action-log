const { Router } = require('express');

const ProjectRepo = require('../repos/project.repo');

const router = new Router();

router.get('/projects', async (req, res) => {
  const result = await ProjectRepo.find();

  res.json(result);
});

router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const result = await ProjectRepo.findById(id);

  res.json(result);
});

router.post('/projects', async (req, res) => {
  const { title } = req.body;
  const result = await ProjectRepo.create(title, req.user.id);
  res.json(result);
});

router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const result = await ProjectRepo.update(id, title);

  res.json(result);
});

router.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const result = await ProjectRepo.delete(id);

  res.json(result);
});

module.exports = router;
