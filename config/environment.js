const { dev, prod } = require('./configParams');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');
fs.existsSync(logDirectory || fs.mkdirSync(logDirectory));

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory,
});

const development = {
  name: dev,
  port: process.env.SOCIALLY_PORT,
  asset_path: './assets',
  session_cookie_key: 'socially',
  db: 'mongodb://localhost/socially',
  nodemailer: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
  },
  google: {
    clientID:
      '882805485844.apps.googleusercontent.com',
    clientSecret: 'GOCSPX-',
    callbackURL: 'http://localhost:8000/users/auth/google/callback',
  },
  jwt_token: '$2a$12$nxXdE54sGzbHGkNtu1IZbwc/s6oSLQlDDdrr.',
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
};

const production = {
  name: prod,
  port: process.env.SOCIALLY_PORT,
  asset_path: process.env.SOCIALLY_ASSET_PATH,
  session_cookie_key: process.env.SOCIALLY_SESSION_COOKIE_KEY,
  db: process.env.SOCIALLY_DB,
  nodemailer: {
    service: process.env.SOCIALLY_NODEMAILER_SERVICE,
    host: process.env.SOCIALLY_NODEMAILER_HOST,
    port: process.env.SOCIALLY_NODEMAILER_PORT,
    secure: process.env.SOCIALLY_NODEMAILER_SECURE,
    auth: {
      user: process.env.SOCIALLY_NODEMAILER_AUTH_USERNAME,
      pass: process.env.SOCIALLY_NODEMAILER_AUTH_PASS,
    },
  },
  google: {
    clientID: process.env.SOCIALLY_GOOGLE_CLIENTID,
    clientSecret: process.env.SOCIALLY_GOOGLE_CLIENT_SERVER,
    callbackURL: process.env.SOCIALLY_GOOGLE_CALLBACKURL,
  },
  jwt_token: process.env.SOCIALLY_JWT_TOKEN,
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.NODE_ENV) == 'production' ? production : development;
