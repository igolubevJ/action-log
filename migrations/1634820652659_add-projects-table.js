/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(350) UNIQUE NOT NULL,
      creator_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE projects;
  `);
};
