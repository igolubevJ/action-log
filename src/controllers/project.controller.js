const { validationResult } = require('express-validator');

const ProjectRepo = require('../repos/project.repo');

module.exports.find = async (req, res) => {
  const result = await ProjectRepo.find();

  res.json(result);
};

module.exports.findById = async (req, res) => {
  const { id } = req.params;
  const result = await ProjectRepo.findById(id);

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

  const { title } = req.body;
  const result = await ProjectRepo.create(title, req.user.id);
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
  const { title } = req.body;

  const result = await ProjectRepo.update(id, title);

  res.json(result);
};

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  const result = await ProjectRepo.delete(id);

  res.json(result);
};
