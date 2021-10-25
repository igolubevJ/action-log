const { SUCCESS, ERROR } = require('../const');

const toCamelCase = require('../utils/to-camel-case');

class Repo {
  static _successResult(payload) {
    if (Array.isArray(payload)) {
      return { status: SUCCESS, payload: toCamelCase(payload) }
    }

    return { status: SUCCESS, payload: toCamelCase([payload])[0] };
  }

  static _errorResult(message) {
    return { status: ERROR, message };
  }
}

module.exports = Repo;
