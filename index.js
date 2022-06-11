const express = require('express');
const port = 8000;
const app = express();

// import database
const db = require('./config/mongoose');

// parsing the request
app.use(express.urlencoded());
app.use(express.json());

// include layouts in the views using middleware.
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// with middleware import route
app.use('/', require('./routes'));
app.use(express.static('assets'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// extract styles if found in body of layout to the head
app.set('layout extractStyles', true);
//extract scripts if found in the body of layout to the bottom of the body
app.set('layout extractScripts', true);

app.listen(port, function (err) {
  if (err) {
    console.error(`ERROR: ${err}`);
  }
  console.log(`Server is up and running on ${port} port.`);
});
