const UserRepo = require('../repos/user.repo');

module.exports.find = async (req, res) => {
  const { banned } = req.query;
  
  if (banned) {
    const result = await UserRepo.findNotBanned();
    return res.json(result);
  }

  const result = await UserRepo.find();
  return res.json(result);
};

module.exports.create = async (req, res) => {
  const { name } = req.body;

  const result = await UserRepo.create(name);
  return res.json(result);
};

module.exports.banned = async (req, res) => {
  const { id } = req.params;

  const result = await UserRepo.banned(id);
  return res.json(result);
};
