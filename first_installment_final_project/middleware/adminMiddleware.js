const admin = process.env.ADMIN;
console.log('The admin user is ' + admin);
const adminMiddleware = function (req, res, next) {
  if (admin == 'true') {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = adminMiddleware;
