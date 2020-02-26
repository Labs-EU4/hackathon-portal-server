const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const winston = require('../config/winston');
const setReminder = require('../utils/reminder');
// Schemas for JOI validation for ID

dotenv.config();
const routes = require('../routes');

const server = express();

// setReminder();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(morgan('combined', { stream: winston.stream }));

server.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};

  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  res.status(err.status || 500);
  res.render('error');
  next();
});

server.use('/api', routes);

server.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Hello from Hackton backend!'
  });
});

server.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Invalid route!'
  });
});

module.exports = server;
