const express = require('express');

const { currentUser } = require('./middleware/current-user.middleware');

const projectRouter = require('./routes/project.router');
const missionRouter = require('./routes/mission.router');
const taskRouter = require('./routes/tast.router');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use(currentUser);

  app.use('/api', projectRouter);
  app.use('/api', missionRouter);
  app.use('/api', taskRouter);
  app.use('/api', userRouter);
  app.use('/api', authRouter);

  app.get('/', (req, res) => {
    res.send('Server is running');
  });
  
  return app;
};

module.exports = createServer();
