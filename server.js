require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const serverSetup = require('./serverConfig');
const serviceRoutes = require('./_routes');
const server = express();

const _port = process.env.PORT || 3001;

serviceRoutes(server);
serverSetup(server);

server.listen(_port, () => {
  console.log('server is running on ' + _port);
});
