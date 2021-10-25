/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE state_tasks (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) UNIQUE NOT NULL
    );
  `)
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE state_tasks;
  `);
};
