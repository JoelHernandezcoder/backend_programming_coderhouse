const auth = function (req, res, next) {
  if (req.session.login) {
    next();
  } else {
    return res.status(401).send('not authorized');
  }
};
module.exports = auth;
