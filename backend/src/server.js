const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./database/models');
require('./configs/global');
const appRoutes = require('./Routes/Router');
const ResponseHandler = require('./configs/responseHandler');

const SHOULD_RUN_ON_HTTP = process.env.SHOULD_RUN_ON_HTTP === 'true';
const PROTOCOL = SHOULD_RUN_ON_HTTP ? http : https;
const PORT = process.env.PORT || 3510;
const certificate_options = SHOULD_RUN_ON_HTTP ? {} : {};

const App = express();
const SERVER = SHOULD_RUN_ON_HTTP
  ? PROTOCOL.createServer(App)
  : PROTOCOL.createServer(certificate_options, App);

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(cors());

// Response Handler
App.use((req, res, next) => {
  res.handler = new ResponseHandler(req, res);
  next();
});

App.use('/app', appRoutes);

// Global Error Handler
App.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.handler.internalServerError();
});

SERVER.listen(PORT, () => {
  console.log(`\nServer started on port ${PORT} ${":)"} \n`)
});
