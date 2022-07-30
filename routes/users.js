const express = require('express');
const router = express.Router();
const passport = require('passport');

const profile_controller = require('../controllers/user/user');
const post_controller = require('../controllers/posts');
const auth_controller = require('../controllers/user/authentication');

router.get('/auth', auth_controller.authentication);
router.post('/signup', auth_controller.signup);
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/user/auth' }),
  auth_controller.login
);
router.get('/logout', auth_controller.logout);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/user/auth',
  }),
  auth_controller.login
);

router.get(
  '/profile/:id',
  passport.checkAuthentication,
  profile_controller.profile
);
router.get(
  '/profile',
  passport.checkAuthentication,
  profile_controller.profile
);
router.post(
  '/profile/edit',
  passport.checkAuthentication,
  profile_controller.edit
);

module.exports = router;
