const express = require('express');
const router = express.Router();
const profile_controller = require('../controllers/user/user');
const post_controller = require('../controllers/posts');
const auth_controller = require('../controllers/user/authentication');

router.get('/auth', auth_controller.authentication);
router.post('/signup', auth_controller.signup);
router.post('/login', auth_controller.login);
router.get('/logout', auth_controller.logout);

router.get('/profile', profile_controller.profile);
router.get('/posts', post_controller.posts);

module.exports = router;
