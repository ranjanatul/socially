// each time we write require('express') doesn't create new instance. It will use the existing instance. this is handled by express.
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const homeRoutesController = require('../controllers/homeRoutes');

// route.get to serve the request with '/'
router.get('/', homeController.home);

// middleware 'router.use' to further decide the sub folder
router.use('/user', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comment', require('./comments'));

router.get('/about', homeRoutesController.about);
router.get('/help', homeRoutesController.help);

module.exports = router;
