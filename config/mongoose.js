const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socially');

const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, 'Error while connecting the DB! :(')
);

db.once('open', function () {
  console.log('Database connected successfully!');
});

module.exports = db;
