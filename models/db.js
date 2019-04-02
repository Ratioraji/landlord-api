const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const DBURL = process.env.DBURI;
const options = {
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE, 
  reconnectInterval: 500, 
  poolSize: 10,
  bufferMaxEntries: 0
};
 
mongoose.connect(DBURL, options);

mongoose.connection.on('connected', () => {
  console.log('Connected to ', DBURL);
});

mongoose.connection.on('disconnected', () => {
  console.error('Disconnected From ', DBURL); 
});

mongoose.connection.on('error', (error) => {
  console.error(error);
});

/* Require Your Models */

require('./user');
require('./landlord');
require('./assets');
require('./rents');



