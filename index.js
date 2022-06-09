const express = require('express');
const port = 8000;
const app = express();

// with middleware import route
app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.error(`ERROR: ${err}`);
  }
  console.log(`Server is up and running on ${port} port.`);
});
