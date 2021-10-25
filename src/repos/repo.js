const { SUCCESS, ERROR } = require('../const');

class Repo {
  static _successResult(payload) {
    return { status: SUCCESS, payload };
  }

  static _errorResult(message) {
    return { status: ERROR, message };
  }
}

module.exports = Repo;
