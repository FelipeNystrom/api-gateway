const proxy = require('./imageService');

module.exports = server => {
  server.use('/api/upload/image/upload', proxy);
  server.use('/api/upload/image/update', proxy);
  server.use('/api/upload/image/delete', proxy);
};
