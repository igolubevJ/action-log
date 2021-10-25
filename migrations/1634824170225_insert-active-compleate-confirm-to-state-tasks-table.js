/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    INSERT INTO state_tasks (name) 
    VALUES ('active'), ('compleate'), ('confirm');
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DELETE FROM state_tasks;
  `);
};
