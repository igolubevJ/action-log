/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(80) NOT NULL,
      password VARCHAR(200),
      banned BOOLEAN NOT NULL DEFAULT FALSE,
      role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL DEFAULT 2,
      chat VARCHAR(100)
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE users;
  `);
};
