require('dotenv').config({ path: '.env' });
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const { sendJSONResponse } = require('./helpers');
const port = process.env.PORT || 3900;

require('./models/db');

const app = express();
app.use(cors());
const apiRoutes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/api', apiRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error('THIS IS ERR', err);
  if (err.isBoom) {
    let message = err.data[0].message;
    sendJSONResponse(res, err.output.statusCode, { status: 0, message });
  } else if (err.status === 404) {
    sendJSONResponse(res, err.status, 'Not Found');
  } else {
    sendJSONResponse(res, 500, 'Something Went Wrong!');
  }
});

process.on('unhandledRejection', error => {
  console.error('UnhandledRejection', error);
});

app.listen(port, () => {
  console.log('Server Running on Port', port);
});

module.exports = app;
