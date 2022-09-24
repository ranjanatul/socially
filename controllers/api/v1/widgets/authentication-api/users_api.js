const User = require('../../../../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  genericResponse,
  redirectResponse,
} = require('../../utils/responses/generic');
const env = require('../../../../../config/environment');
const {
  InvalidUserPass,
  LoggedIn,
  ExpiresIn,
  key,
  SaltRounds,
  ServerIssue,
  UserExists,
  Token,
} = require('../../utils/descriptor/user.descriptor');
const {
  IncorrectData,
  Success,
  ServerError,
  Conflict,
} = require('../../utils/descriptor/responseCode');
const { profile } = require('../../utils/descriptor/urls');
const { Error } = require('../../utils/descriptor/responseKeys');

module.exports = {
  login: async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!user || !validPass) {
        return genericResponse(res, {
          code: IncorrectData,
          msg: InvalidUserPass,
        });
      }
      return redirectResponse(res, {
        code: Success,
        msg: LoggedIn,
        dataKey: Token,
        data: jwt.sign(user.toJSON(), key, { expiresIn: ExpiresIn }),
        url: home,
      });
    } catch (error) {
      console.log(Error, error);
      return genericResponse(res, { code: ServerError, msg: InvalidUserPass });
    }
  },
  signup: async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        req.flash('error', 'You are already logged in!');
        return res.redirect('/user/profile');
      }

      // if (regex)

      if (
        req.body.password !== req.body.password2 ||
        !req.body.password ||
        !req.body.email ||
        !req.body.name
      ) {
        req.flash('error', 'Please provide all the required details.');
        return res.render('auth');
      }

      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        req.body.password = await bcrypt.hash(req.body.password, SaltRounds);
        req.body.username = await bcrypt.hash(req.body.email, SaltRounds);
        let newUser = await User.create(req.body);
        if (newUser) {
          return redirectResponse(res, {
            code: Success,
            msg: LoggedIn,
            dataKey: Token,
            data: jwt.sign(newUser.toJSON(), env.jwt_token, {
              expiresIn: ExpiresIn,
            }),
            url: profile,
          });
        } else {
          throw 'New user creation failed at the server side.';
        }
      }
      return genericResponse(res, { code: Conflict, msg: UserExists });
    } catch (error) {
      console.error('ERROR:', error);
      return genericResponse(res, { code: ServerError, msg: ServerIssue });
    }
  },
};
