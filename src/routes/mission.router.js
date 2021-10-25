const { Router } = require('express');

const MissionRepo = require('../repos/mission.repo');

const router = Router();

router.get('/missions', async (req, res) => {
  const result = await MissionRepo.find();

  res.json(result);
});

router.get('/missions/:id', async (req, res) => {
  const { id } = req.params;
  const result = await MissionRepo.findById(id);

  res.json(result);
});

router.post('/missions', async (req, res) => {
  const { title, projectId } = req.body;
  const result = await MissionRepo.create(title, projectId, req.user.id);

  res.json(result);
});

router.put('/missions/:id', async (req, res) => {
  const { id } = req.params;
  const { title, projectId } = req.body;

  const result = await MissionRepo.update(id, title, projectId);
  res.json(result);
});

router.delete('/missions/:id', async (req, res) => {
  const { id } = req.params;
  const result = await MissionRepo.delete(id);
  
  res.json(result);
});

module.exports = router;
