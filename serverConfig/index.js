const express = require('express');
const helmet = require('helmet');

module.exports = server => {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(helmet());
};
