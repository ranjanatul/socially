const { Err, AuthToken } = require('../descriptor/responseKeys.js');
const { Token } = require('../descriptor/user.descriptor');

module.exports = {
  genericResponse: async (res, args) => {
    const { code, msg, err, dataKey, data } = args;
    if (err) {
      res.setHeader('ERR', err);
    }
    return res.status(code).json({
      message: msg,
      data: {
        [dataKey]: data,
      },
    });
  },
  redirectResponse: async (res, args) => {
    const { code, msg, err, dataKey, data, url } = args;
    if (err) {
      res.setHeader(Err, err);
    }
    if (dataKey === Token) {
      res.setHeader(AuthToken, data);
    }
    return res.redirect(url);
  },
};
