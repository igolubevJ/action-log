/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    INSERT INTO roles (name, volume)
    VALUES ('admin', 100), ('user', 0);
  `);
};

exports.down = pgm => {
  pgm.sql(
    `DELETE FROM roles WHERE name = 'admin' OR name = 'user'`
  );
};
