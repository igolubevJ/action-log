const app = require('./src/app');
const Pool = require('./src/pool');

Pool.connect({
  host: '172.18.0.2',
  port: 5432,
  database: 'action-log',
  user: 'postgres',
  password: 'postgres_password'
}).then(() => {
  console.log('[info] DB Connecting');
  app.listen(3050, () => {
    console.log('[info] Server is listening port 3050');
  });
});
