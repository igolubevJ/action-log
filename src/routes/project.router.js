const { Router } = require('express');

const router = new Router();

router.get('/projects', (req, res) => {
  res.send('GET /api/projects - not implement')
});

router.get('/projects/:id', (req, res) => {
  const { id } = req.params;
  res.send(`GET /api/projects/${id} - not implement`);
});

router.post('/projects', (req, res) => {
  const { title } = req.body;
  res.send(`POST /api/projects { title: ${title} } - not implement`);
});

router.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  res.send(`PUT /api/projects/${id} { title: ${title} } - not implement`);
});

router.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  res.send(`DELETE /api/projects/${id} - not implement`);
});

module.exports = router;