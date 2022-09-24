const express = require('express');
const router = express.Router();

const userApi = require('../../../controllers/api/v1/widgets/authentication-api/users_api');

router.post('/login', userApi.login);
router.post('/signup', userApi.signup);

module.exports = router;
