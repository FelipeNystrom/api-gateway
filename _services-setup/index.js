const proxy = require('express-http-proxy');
const Docker = require('dockerode');
const passport = require('passport');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const isMultipartRequest = req => {
  let contentTypeHeader = req.headers['content-type'];
  return contentTypeHeader && contentTypeHeader.indexOf('multipart') > -1;
};

module.exports = async server => {
  return docker.listContainers(async (err, containers) => {
    if (err) {
      console.error(err);
      return;
    }

    await containers.forEach(container => {
      const {
        Labels: { serviceName, serviceRoute }
      } = container;

      if (serviceName && serviceRoute) {
        server.use(
          `/${serviceRoute}`,
          (req, res, next) => {
            if (req.originalUrl === '/auth/admin/login') {
              next();
            } else {
              return passport.authenticate('jwt', { session: false })(
                req,
                res,
                next
              );
            }
          },
          (req, res, next) => {
            return proxy(`http://${serviceName}:3000`, {
              parseReqBody: !isMultipartRequest(req),
              proxyReqPathResolver: req => {
                return `http://${serviceName}:3000${req.url}`;
              }
            })(req, res, next);
          }
        );
      }
    });
  });
};
