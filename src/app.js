const express = require('express');

const { currentUser } = require('./middleware/current-user.middleware');

const projectRouter = require('./routes/project.router');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use(currentUser);

  app.use('/api', projectRouter);

  app.get('/', (req, res) => {
    res.send('Server is running');
  });
  
  return app;
};

module.exports = createServer();
