// each time we write require('express') doesn't create new instance. It will use the existing instance. this is handled by express.
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

// user router which will further decide the sub folders
const user = require('./users');

// route.get to serve the request with '/'
router.get('/', homeController.home);

// middleware 'router.use' to further decide the sub folder
router.use('/user', user);

module.exports = router;
