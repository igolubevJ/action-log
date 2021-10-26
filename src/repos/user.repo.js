const Pool = require('../pool');

const Repo = require('./repo');

class UserRepo extends Repo {
  static async find() {
    try {
      const { rows } = await Pool.query('SELECT * FROM users;');
      return this._successResult(rows);
    } catch(err) {
      return this._errorResult(err.message);
    }
  }

  static async findNotBanned() {
    try {
      const { rows } = await Pool.query(
        'SELECT * FROM users WHERE banned = false'
      );

      return this._successResult(rows);
    } catch (err) {
      return this._errorResult(err.message);
    }
  }

  static async create(name) {
    try {
      const { rows } = await Pool.query(
        'INSERT INTO users (name) VALUES ($1) RETURNING *;',
        [name]
      );
      return this._successResult(rows[0]);
    } catch(err) {
      return this._errorResult(err.message);
    }
  }

  static async banned(id) {
    try {
      const { rows } = await Pool.query(
        'UPDATE users SET banned = NOT banned WHERE id = $1 RETURNING *;', 
        [id]
      );
      
      if (!rows[0]) {
        throw new Error(`Not found user by id: ${id}`);
      }

      return this._successResult(rows[0]);
    } catch(err) {
      return this._errorResult(err.message);
    }
  }
}

module.exports = UserRepo;
