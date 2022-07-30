const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/login', require('./users'));

module.exports = router;
