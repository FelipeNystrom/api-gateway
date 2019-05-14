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
  // console.log(server.use);

  // console.log(routes[0]);

  // for (let i = 0; i < routes.length; i++) {
  //   console.log(routes[i]);
  //   server.use(
  //     routes[i].serviceRoute,
  //     proxy(`http://${routes[i].serviceName}:3000`, {
  //       proxyReqOptDecorator: () => {
  //         return Promise.reject('An arbitrary rejection message.');
  //       },
  //       proxyReqPathResolver: req => {
  //         console.log(req);
  //         debugger;
  //       }
  //     })
  //   );
  //   console.log('Route: ' + route.serviceRoute + ' is setup');
  // }
  console.log(Array.isArray(routes), routes.length, routes);
};
