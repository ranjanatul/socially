const User = require('../../models/user');

module.exports = {
  authentication: (req, res) => {
    if (req.cookies.userId) {
      User.findById(req.cookies.userId)
        .then((user) => {
          res.render('profile', {
            title: `${user.name} | profile`,
            name: user.name,
            email: user.email,
          });
        })
        .catch((err) => {
          console.error(err);
          return;
        });
    } else {
      return res.render('auth', {
        title: 'Socially | Lets Connect',
      });
    }
  },
  signup: (req, res) => {
    if (
      req.body.password !== req.body.password2 ||
      !req.body.password ||
      !req.body.email ||
      !req.body.name
    ) {
      return res.render('auth', {
        title: 'Socially | Lets Connect',
      });
    }
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          User.create(req.body).then((user) => {
            res.cookie('userId', user.id);
            return res.render('profile', {
              title: `${user.name} | profile`,
              name: user.name,
              email: user.email,
            });
          });
        } else {
          return res.render('auth', {
            title: 'Socially | Lets Connect',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        return res.render('auth', {
          title: 'Socially | Lets Connect',
        });
      });
  },
  login: (req, res) => {
    if (!req.body.password || !req.body.email) {
      return res.render('auth', {
        title: 'Socially | Lets Connect',
      });
    }

    // find the user
    User.findOne({ email: req.body.email })
      .then((user) => {
        // if user is not found or password doesn't match
        if (!user || user.password !== req.body.password) {
          return res.render('auth', {
            title: 'Socially | Lets Connect',
          });
        } else {
          // if user found, create session.
          res.cookie('userId', user.id);
          return res.render('profile', {
            title: `${user.name} | profile`,
            name: user.name,
            email: user.email,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        return res.render('auth', {
          title: 'Socially | Lets Connect',
        });
      });
  },
  logout: (req, res) => {
    console.log(req.cookies.userId);
    res.clearCookie('userId');
    return res.render('home', {
      title: 'Socially | Lets Connect',
    });
  },
};
