const { promisify } = require('util');
const jwt = require('jsonwebtoken');

module.exports.authProtect = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error('not auth');
    }

    const authToken = authHeader.split(' ')[1];
    if (!authToken) {
      throw new Error('not auth');
    }
    await promisify(jwt.verify)(authToken, 'secret-change-to-env');

    next();
  } catch(err) {
    res.status(401).send(err.message);
  }
}
