const imageProxy = require('./imageService');
const userProxy = require('./userService.js');
const tokenCheck = require('../_token-auth');

const imageServicePath = '/api/upload/image';
const imageServiceEndpoints = ['/upload', '/update', '/delete'];

const userServicePath = '/api/user';
const userServiceEndpoints = ['/token/verify', '/create'];

module.exports = server => {
  userServiceEndpoints.forEach(endpoint => {
    server.use(userServicePath + endpoint, userProxy);
  });

  imageServiceEndpoints.forEach(endpoint => {
    const path = `${imageServicePath}${endpoint}`;
    server.use(path, tokenCheck, imageProxy);
  });

  // server.use('/api/upload/image/upload', tokenCheck, proxy);
  // server.use('/api/upload/image/update', tokenCheck, proxy);
  // server.use('/api/upload/image/delete', tokenCheck, proxy);
  // server.use('');
};
