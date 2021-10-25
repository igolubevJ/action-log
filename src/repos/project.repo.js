const Pool = require('../pool');

const Repo = require('./repo');

const toCamelCase = require('../utils/to-camel-case');

class ProjectRepo extends Repo {
  static async find() {
    try {
      const { rows } = await Pool.query('SELECT * FROM projects;');
      return this._successResult(toCamelCase(rows));
    } catch(err) {
      return this._errorResult(err.message);
    }
  }

  static async findById(id) {
    try {
      const { rows } = await Pool.query('SELECT * FROM projects WHERE id = $1;', [id]);
      
      if (!rows[0]) {
        throw new Error(`Not found project by id: ${id}`);
      }

      return this._successResult(toCamelCase(rows)[0]);
    } catch(err) {
      return this._errorResult(err.message);
    }
  }

  static async create(title, creatorId) {
    try {
      const { rows } = await Pool.query(
        'INSERT INTO projects (title, creator_id) VALUES ($1, $2) RETURNING *;',
        [title, creatorId]
      );
      return this._successResult(toCamelCase(rows)[0]);
    } catch (err) {
      return this._errorResult(err.message);
    }
  }

  static async update(id, title) {
    try {
      const { rows } = await Pool.query(
        'UPDATE projects SET title = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;',
        [id, title]
      );
      if (!rows[0]) {
        throw new Error(`Not found project by id: ${id}`);
      }

      return this._successResult(toCamelCase(rows)[0]);
    } catch(err) {
      return this._errorResult(err.message);
    }
  }

  static async delete(id) {
    try {
      await Pool.query('DELETE FROM projects WHERE id = $1', [id]);

      return this._successResult({
        id,
        message: 'destroy ' + id 
      });
    } catch (err) {
      return this._errorResult(err.message);
    }
  }
}

module.exports = ProjectRepo;
