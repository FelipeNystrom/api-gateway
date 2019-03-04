const imageServiceProxy = require('http-proxy-middleware');

const { IMAGE_SERVICE_URL } = process.env;

const options = {
  target: IMAGE_SERVICE_URL,
  pathRewrite: { '^/': '/api/upload/image' },
  changeOrigin: true,
  secure: false
};

module.exports = imageServiceProxy(options);
