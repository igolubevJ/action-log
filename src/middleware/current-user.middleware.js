module.exports.currentUser = (req, res, next) => {
  req.user = { id: 1 };
  next();
};
