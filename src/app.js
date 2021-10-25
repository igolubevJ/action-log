const express = require('express');

const projectRouter = require('./routes/project.router');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/api', projectRouter);

  app.get('/', (req, res) => {
    res.send('Server is running');
  });
  
  return app;
};

module.exports = createServer();
