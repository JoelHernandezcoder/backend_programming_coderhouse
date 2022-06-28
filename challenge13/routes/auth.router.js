const express = require('express');
const passport = require('../utils/passport.util.js');

const router = express.Router();

const {
  getSignup,
  postSignup,
  failSignup,
  getLogin,
  postLogin,
  failLogin,
  logOut,
} = require('../controllers/auth.controller.js');

/* -------------------------------------------------------------------------- */
/*                                   signup                                   */
/* -------------------------------------------------------------------------- */

router.get('/signup', getSignup);
router.post(
  '/signup',
  passport.authenticate('signup', { failureRedirect: '/fileSignup' }),
  postSignup
);
router.get('/failSignup', failSignup);

/* -------------------------------------------------------------------------- */
/*                                    login                                   */
/* -------------------------------------------------------------------------- */

router.get('/login', getLogin);
router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/failLogin' }),
  postLogin
);
router.get('/failLogin', failLogin);

/* -------------------------------------------------------------------------- */
/*                                   logout                                   */
/* -------------------------------------------------------------------------- */

router.get('/logout', logOut);

/* -------------------------------------------------------------------------- */
/*                                authenticated                               */
/* -------------------------------------------------------------------------- */

module.exports = router;
