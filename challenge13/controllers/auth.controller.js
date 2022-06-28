const path = require('path');
/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

function getSignup(req, res) {
  res.sendFile(path.resolve() + '/views/signup.html');
}

function postSignup(req, res) {
  const user = req.user;
  console.log(user);
  res.sendFile(path.resolve() + '/views/login.html');
}

function failSignup(req, res) {
  console.log('registration error');
  res.render('signup-error', {});
}

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log('user logged!');
    res.render('login-ok', {
      usuario: user.userName,
      nombre: user.firstName,
      apellido: user.lastName,
      email: user.email,
    });
  } else {
    console.log('user not logged in');
    res.sendFile(path.resolve() + '/views/login.html');
  }
}

function postLogin(req, res) {
  const user = req.user;
  console.log(user);
  res.sendFile(path.resolve() + '/views/index.html');
}

function failLogin(req, res) {
  console.log('login error');
  res.render('login-error', {});
}

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */

function logOut(req, res) {
  console.log('logout');
  req.logout();
  res.sendFile(path.resolve() + '/views/login.html');
}

module.exports = {
  getSignup,
  postSignup,
  failSignup,
  getLogin,
  postLogin,
  failLogin,
  logOut,
};
