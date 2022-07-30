const passport = require('passport');
const express = require('express');
const router = express.Router();

const comment_controller = require('../controllers/comment');

router.post('/create', passport.checkAuthentication, comment_controller.create);
router.get(
  '/delete/:id',
  passport.checkAuthentication,
  comment_controller.delete
);

module.exports = router;
