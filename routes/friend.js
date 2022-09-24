const router = require('express').Router();
const passport = require('passport');
const friendController = require('../controllers/friendController');

router.post('/add', passport.checkAuthentication, friendController.add);
router.delete('/delete', passport.checkAuthentication, friendController.delete);

module.exports = router;
