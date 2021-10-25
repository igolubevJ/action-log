/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE missions (
      id SERIAL PRIMARY KEY,
      title VARCHAR(500) UNIQUE NOT NULL,
      project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
      creator_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE missions;
  `);
};
