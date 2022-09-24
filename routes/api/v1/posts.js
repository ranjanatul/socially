const express = require('express');
const router = express.Router();
const passport = require('passport');

const postApi = require('../../../controllers/api/v1/widgets/posts_api');

router.get('/', postApi.index);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }), // prevent from generating session cookie
  postApi.delete
);

module.exports = router;
