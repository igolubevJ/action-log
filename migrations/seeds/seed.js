const pg = require('pg');

const pool = new pg.Pool({
  host: '172.18.0.2',
  port: 5432,
  database: 'action-log',
  user: 'postgres',
  password: 'postgres_password'
});


const seed = async () => {
  //Clearing 
  await pool.query('DELETE FROM users;');
  await pool.query('DELETE FROM projects;');
  await pool.query('DELETE FROM missions;');
  await pool.query('DELETE FROM tasks;');

  const ur1 = await pool.query(
    'INSERT INTO users (name) VALUES ($1) RETURNING *;',
    ['Dummy user 1']
  );

  const userOne = ur1.rows[0];

  const ur2 = await pool.query(
    'INSERT INTO users (name) VALUES ($1) RETURNING *;',
    ['Dummy user 2']
  );

  const userTwo = ur2.rows[0];

  const pr1 = await pool.query(
    'INSERT INTO projects (title, creator_id) VALUES ($1, $2) RETURNING *;',
    ['Project dummy 1', userOne.id]
  );

  const pr2 = await pool.query(
    'INSERT INTO projects (title, creator_id) VALUES ($1, $2) RETURNING *;',
    ['Project dummy 2', userTwo.id]
  );

  const projectOne = pr1.rows[0];
  const projectTwo = pr2.rows[0];

  const mr1 = await pool.query(
    'INSERT INTO missions (title, project_id, creator_id) VALUES ($1, $2, $3) RETURNING *;',
    ['Mission dummy 1', projectOne.id, userTwo.id]
  );

  const mr2 = await pool.query(
    'INSERT INTO missions (title, project_id, creator_id) VALUES ($1, $2, $3) RETURNING *;',
    ['Mission dummy 2', projectTwo.id, userOne.id]
  );

  const mr3 = await pool.query(
    'INSERT INTO missions (title, project_id, creator_id) VALUES ($1, $2, $3) RETURNING *;',
    ['Mission dummy 3', projectOne.id, userOne.id]
  );

  const missionOne = mr1.rows[0];
  const missionTwo = mr2.rows[0];
  const missionThree = mr3.rows[0];


  const tr1 = await pool.query(
    'INSERT INTO tasks (title, content, mission_id, creator_id, executor_id) '
    + 'VALUES ($1, $2, $3, $4, $5)',
    ['Task dummy 1', 'Task contentn dummy test 1', missionOne.id, userTwo.id, userOne.id]
  );

  const tr2 = await pool.query(
    'INSERT INTO tasks (title, content, mission_id, creator_id, executor_id) '
    + 'VALUES ($1, $2, $3, $4, $5)',
    ['Task dummy 2', 'Task contentn dummy test 2', missionThree.id, userTwo.id, userOne.id]
  );

  const tr3 = await pool.query(
    'INSERT INTO tasks (title, content, mission_id, creator_id, executor_id) '
    + 'VALUES ($1, $2, $3, $4, $5)',
    ['Task dummy 3', 'Task contentn dummy test 3', missionTwo.id, userOne.id, userTwo.id]
  );

  pool.end(() => {
    console.log('Pool ended');
  });
}

seed();
