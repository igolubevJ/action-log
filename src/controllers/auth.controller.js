const UserRepo = require('../repos/user.repo');

module.exports.signin = async (req, res) => {
  const { id, password } = req.body;
  const result = await UserRepo.signin(id, password);

  res.json(result);
};
