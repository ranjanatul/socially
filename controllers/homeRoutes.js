module.exports = {
  about: (req, res) => {
    return res.render('about', {
      title: 'Socially | Lets Connect',
    });
  },
  help: (req, res) => {
    return res.render('help', {
      title: 'Socially | Lets Connect',
    });
  },
};
