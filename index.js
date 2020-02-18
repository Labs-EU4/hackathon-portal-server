const server = require('./api/server');
const winston = require('./config/winston');

const port = process.env.PORT || 4000;

server.listen(port, err => {
  if (err) return winston.info(err.message);
  return winston.info(`Application started on http://localhost:${port}`);
});
