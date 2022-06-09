// each time we write require('express') doesn't create new instance. It will use the existing instance. this is handled by express.
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

console.log('Route loaded successfully.');

module.exports = router;
