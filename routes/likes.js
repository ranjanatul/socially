const router = require('express').Router();
const passport = require('passport');
const likesController = require('../controllers/likeController');

router.post(
  '/toggle',
  passport.checkAuthentication,
  likesController.toggleLike
);
module.exports = router;
