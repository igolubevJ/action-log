const Pool = require('../pool');

const Repo = require('./repo');

class TaskRepo extends Repo {
  static async find() {
    try {
      const { rows } = await Pool.query('SELECT * FROM tasks;');
  
      return this._successResult(rows);
    } catch (err) {
      return this._errorResult(err.message);
    }
  }

  static async findById(id) {
    try {
      const { rows } = await Pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
      
      if(!rows[0]) {
        throw new Error(`Not found project by id: ${id}`);
      }

      return this._successResult(rows[0]);
    } catch (err) {
      return this._errorResult(err.message);
    }
  }

  static async create(title, content, missionId, executorId, creatorId, deadline) {
    try {
      const { rows } = await Pool.query(
        'INSERT INTO tasks (title, content, mission_id, executor_id, creator_id, deadline) ' 
        + 'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
        [title, content, missionId, executorId, creatorId, deadline]
      );

      return this._successResult(rows[0]);
    } catch (err) {
      return this._errorResult(err.message);
    }
  }

  static async update(id, title, content, executorId, deadline) {
    try {
      const { rows } = await Pool.query(
        'UPDATE tasks SET title = $2, content = $3, executor_id = $4, deadline = $5 '
        + 'WHERE id = $1 RETURNING *;',
        [id, title, content, executorId, deadline]
      );
      return this._successResult(rows[0]);
    } catch(err) {
      return this._errorResult(err.message);
    }
  }

  static async delete(id) {
    try {
      const { rows } = await Pool.query(
        'DELETE FROM tasks WHERE id = $1;',
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

module.exports = TaskRepo;
