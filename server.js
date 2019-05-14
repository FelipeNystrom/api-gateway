require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const serverSetup = require('./serverConfig');
const serviceDiscovery = require('./_services-setup');
const server = express();
const _port = process.env.PORT || 3001;

serverSetup(server);

serviceDiscovery(server);

server.listen(_port, () => {
  console.log('server is running on ' + _port);
});
