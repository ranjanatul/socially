const express = require('express');
const port = 8000;
const app = express();

// import database
const db = require('./config/mongoose');

// import passport for authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');
app.use(
  sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    // to show info if there any error in compilation
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
  })
);

// parsing the request
app.use(express.urlencoded());
app.use(express.json());

// include layouts in the views using middleware.
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: 'locale',
    // key has to be updated something strong before deploying it to prod
    secret: 'socially',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create(
      {
        mongoUrl: 'mongodb://localhost/socially',
      },
      function (err) {
        console.log(err || 'Connect-mongodb session ok.');
      }
    ),
  })
);

// use passport to authenticate the request
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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
