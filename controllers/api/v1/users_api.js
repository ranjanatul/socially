const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user || user.password != req.body.password) {
        return res.json(422, {
          message: 'Invalid username or password.',
        });
      }

      return res.json(200, {
        message: 'Logged in successfully.',
        data: {
          token: jwt.sign(user.toJSON(), 'socially', { expiresIn: '100000' }),
        },
      });
    } catch (error) {
      console.log('ERROR:', error);
      return res.json(500, {
        message: 'Internal server error.',
      });
    }
  },
};
