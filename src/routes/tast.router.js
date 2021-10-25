const { Router } = require('express');

const TaskRepo = require('../repos/task.repo');

const router = Router();

router.get('/tasks', async (req, res) => {
  const result = await TaskRepo.find();
  res.json(result);
});

router.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const result = await TaskRepo.findById(id);

  res.json(result);
});

router.post('/tasks', async (req, res) => {
  const { 
    title, 
    content, 
    missionId, 
    executorId, 
    deadline 
  } = req.body;

  const result = await TaskRepo.create(
    title, 
    content, 
    missionId, 
    executorId, 
    req.user.id, 
    deadline
  );

  res.json(result);
});

router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, executorId, deadline } = req.body;

  const result = await TaskRepo.update(id, title, content, executorId, deadline);
  res.json(result);
});

router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  const result = await TaskRepo.delete(id);
  res.json(result);
});

module.exports = router;
