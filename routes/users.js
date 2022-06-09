const express = require('express');
const router = express.Router();
const profile_controller = require('../controllers/user');
const post_controller = require('../controllers/posts');
router.get('/profile', profile_controller.profile);
router.get('/posts', post_controller.posts);

module.exports = router;
