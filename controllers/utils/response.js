module.exports = {
  genericResponse: ({ code, res, msg, err, data }) => {
    if (err) {
      res.setHeader('ERR-MSG', err);
    }
    return res.status(code).json({
      message: msg,
      data: {
        data: data,
      },
    });
  },
};
