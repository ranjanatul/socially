const express = require('express');
const env = require('./config/environment');
const { dev } = require('./config/configParams');
const logger = require('morgan');
const port = env.port;
const app = express();

require('./config/view-helpers')(app);

const path = require('path');

// import database
const db = require('./config/mongoose');
require('dotenv').config();

// import passport for authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

// setup the chat server to e used with socket.io

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on 5000');

if (env.name === dev) {
  const sassMiddleware = require('node-sass-middleware');
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, 'scss'),
      dest: path.join(__dirname, env.asset_path, 'css'),
      // to show info if there any error in compilation
      debug: true,
      outputStyle: 'extended',
      prefix: '/css',
    })
  );
}

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
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create(
      {
        mongoUrl: env.db,
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

const flash = require('connect-flash');
const setFlashMsg = require('./config/setFlashMsgMiddleWare');

app.use(flash());
app.use(setFlashMsg.setFlash);

//should be used before any calls. So that it can print the coming logs.
app.use(logger(env.morgan.mode, env.morgan.options));

// to make uploads folder available to the browser.
app.use('/user/upload', express.static(__dirname + '/upload'));

// with middleware import route
app.use('/', require('./routes'));
app.use(express.static(env.asset_path));

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
