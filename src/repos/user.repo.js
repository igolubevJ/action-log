const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

  static async signin(id, password) {
    try {
      const { rows } = await Pool.query('SELECT * FROM users WHERE id = $1', [id]);
  
      if (!rows[0]) {
        throw new Error(`Not found user by id: ${id}`);
      }

      const token = this._signInToken(id);
      const candidate = rows[0];

      if (!candidate.password) {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await this._updatePassword(id, hashPassword);
        delete user.password;

        return this._successResult({ user, token });
      }

      const passValiid = await bcrypt.compare(password, candidate.password);
      if (!passValiid) {
        throw new Error(`Password not valid`);
      }
      
      delete candidate.password;

      return this._successResult({ user: candidate, token });
    } catch (err) {
      return this._errorResult(err.message);
    }
  }

  static async _updatePassword(id, password) {
    const { rows } = await Pool.query(
      'UPDATE users SET password = $2 WHERE id = $1 RETURNING *;',
      [id, password]
    );

    return rows[0];
  }

  static _signInToken(id) {
    return jwt.sign({ id: id }, 'secret-change-to-env', {
      expiresIn: '90d'
    });
  }
}

module.exports = UserRepo;
