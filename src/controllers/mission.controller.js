const { validationResult } = require('express-validator');

const MissionRepo = require('../repos/mission.repo');

module.exports.find = async (req, res) => {
  const result = await MissionRepo.find();

  res.json(result);
};

module.exports.findById = async (req, res) => {
  const { id } = req.params;
  const result = await MissionRepo.findById(id);

  res.json(result);
};

module.exports.create = async (req, res) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    return res.json({
      status: 'validation-error',
      errors: errors
    });
  }

  const { title, projectId } = req.body;
  const result = await MissionRepo.create(title, projectId, req.user.id);

  res.json(result);
};

module.exports.update = async (req, res) => {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    return res.json({
      status: 'validation-error',
      errors: errors
    });
  }

  const { id } = req.params;
  const { title, projectId } = req.body;

  const result = await MissionRepo.update(id, title, projectId);
  res.json(result);
};

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  const result = await MissionRepo.delete(id);
  
  res.json(result);
};
