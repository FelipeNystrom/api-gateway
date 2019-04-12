const imageServiceProxy = require('http-proxy-middleware');

const { USER_SERVICE_URL } = process.env;

const options = {
  target: USER_SERVICE_URL,
  pathRewrite: { '^/': '/api/user' },
  changeOrigin: true,
  secure: false
};

module.exports = imageServiceProxy(options);
