/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) UNIQUE NOT NULL,
      volume INTEGER NOT NULL DEFAULT 0,
      CHECK (volume >= 0 AND volume <= 100)
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE roles;
  `);
};
