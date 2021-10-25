const Pool = require('../pool');

const Repo = require('./repo');

class MissionRepo extends Repo {
  static async find() {
    try {
      const { rows } = await Pool.query('SELECT * FROM missions;');
      return this._successResult(rows);
    } catch (err) {
      return this._errorResult(err.message);
    }
  }

  static async findById(id) {
    try {
      const { rows } = await Pool.query('SELECT * FROM missions WHERE id = $1;', [id]);
      
      if(!rows[0]) {
        throw new Error(`Not found project by id: ${id}`);
      }

      return this._successResult(rows[0]);
    } catch (err) {
      return this._errorResult(err.message);
    }
  }

  static async create(title, projectId, creatorId) {
    try {
      const { rows } = await Pool.query(
        'INSERT INTO missions (title, project_id, creator_id) ' 
        + 'VALUES ($1, $2, $3) RETURNING *;',
        [title, projectId, creatorId]
      );
  
      return this._successResult(rows[0])
    } catch (err) {
      return this._errorResult(err.message);
    }
  }

  static async update(id, title, projectId) {
    try {
      const { rows } = await Pool.query(
        'UPDATE missions SET title = $2, project_id = $3, updated_at = CURRENT_TIMESTAMP ' 
        + 'WHERE id = $1 RETURNING *;',
        [id, title, projectId]
      );

      if(!rows[0]) {
        throw new Error(`Not found project by id: ${id}`);
      }

      return this._successResult(rows[0]);
    } catch(err) {
      return this._errorResult(err.message);
    }
  }

  static async delete(id) {
    try {
      await Pool.query(
        'DELETE FROM missions WHERE id = $1',
        [id]
      );

      return this._successResult({
        id,
        message: 'destroy ' + id 
      });
    } catch (err) {
      return this._errorResult(err.message);
    }
  }
}

module.exports = MissionRepo;
