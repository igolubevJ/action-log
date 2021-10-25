/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(300) NOT NULL,
      content VARCHAR(2000) NOT NULL,
      mission_id INTEGER NOT NULL REFERENCES missions (id) ON DELETE CASCADE,
      creator_id INTEGER REFERENCES users (id) ON DELETE SET NULL,
      executor_id INTEGER REFERENCES users (id) ON DELETE SET NULL,
      deadline TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      state_id INTEGER REFERENCES state_tasks (id) ON DELETE SET NULL DEFAULT 1,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE tasks;
  `);
};
