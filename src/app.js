const express = require('express');

const createServer = () => {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Server is running');
  });

  return app;
};

module.exports = createServer();
