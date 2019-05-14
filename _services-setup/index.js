const proxy = require('express-http-proxy');
const Docker = require('dockerode');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

module.exports = async server => {
  return docker.listContainers(async (err, containers) => {
    if (err) {
      console.error(err);
    }

    await containers.forEach(container => {
      const {
        Labels: { serviceName, serviceRoute }
      } = container;
      if (serviceName && serviceRoute) {
        server.use(
          serviceRoute,
          proxy(`http://${serviceName}:3000`, {
            proxyReqPathResolver: req => {
              return `http://${serviceName}:3000${req.url}`;
            }
          })
        );
      }
    });
  });
};
