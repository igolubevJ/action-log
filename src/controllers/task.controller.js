const TaskRepo = require('../repos/task.repo');

module.exports.find = async (req, res) => {
  const result = await TaskRepo.find();
  res.json(result);
};

module.exports.findById = async (req, res) => {
  const { id } = req.params;
  const result = await TaskRepo.findById(id);

  res.json(result);
};

module.exports.create = async (req, res) => {
  const { title, content, missionId, executorId, deadline } = req.body;
  const result = await TaskRepo.create(
    title, 
    content, 
    missionId, 
    executorId, 
    req.user.id, 
    deadline
  );

  res.json(result);
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, content, executorId, deadline } = req.body;

  const result = await TaskRepo.update(id, title, content, executorId, deadline);
  res.json(result);
};

module.exports.destroy = async (req, res) => {
  const { id } = req.params;

  const result = await TaskRepo.delete(id);
  res.json(result);
}
