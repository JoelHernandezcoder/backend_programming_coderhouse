const crypto = require('crypto');

const User = require('../models/user');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

exports.getLogin = (req, res) => {
  let errorMessage = req.flash('error');
  errorMessage = errorMessage.length > 0 ? errorMessage[0] : undefined;

  let successMessage = req.flash('success');
  successMessage = successMessage.length > 0 ? successMessage[0] : undefined;

  res.render('auth/login', {
    path: '/login',
    title: 'Login',
    errorMessage: errorMessage,
    successMessage: successMessage,
    oldInput: {
      email: '',
      password: '',
    },
    validationErrors: [],
  });
};

exports.getSignup = (req, res) => {
  let errorMessage = req.flash('error');
  errorMessage = errorMessage.length > 0 ? errorMessage[0] : undefined;
  res.render('auth/signup', {
    path: '/signup',
    title: 'Sign Up',
    errorMessage: errorMessage,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      title: 'Login',
      errorMessage: errors.array()[0].msg,
      successMessage: undefined,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(422).render('auth/login', {
          path: '/login',
          title: 'Login',
          errorMessage: 'Invalid email or password ❌',
          successMessage: undefined,
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              if (err) {
                throw err;
              }
              res.redirect('/');
            });
          }
          return res.status(422).render('auth/login', {
            path: '/login',
            title: 'Login',
            errorMessage: 'Invalid email or password ❌',
            successMessage: null,
            oldInput: {
              email: email,
              password: password,
            },
            validationErrors: [],
          });
        })
        .catch((err) => {
          return res.status(500).render('auth/login', {
            path: '/login',
            title: 'Login',
            errorMessage: 'Something went wrong. Try again later 😢',
            successMessage: null,
            oldInput: {
              email: email,
              password: password,
            },
            validationErrors: [],
          });
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

exports.postSignup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup',
      title: 'Sign Up',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      const newUser = new User({
        email: email,
        password: hashPassword,
        cart: { items: [] },
      });

      return newUser.save();
    })
    .then(() => {
      req.flash('success', 'Account created successfully 🚀');
      res.redirect('/login');

      const mailOptions = {
        from: 'joelhernandezarg@gmail.com',
        to: email,
        subject: 'Sign Up successfully',
        html: '<h1>Congratulations, you signed up successfully 🚀</h1>',
      };

      transporter
        .sendMail(mailOptions)
        .then(() => {
          console.log('Mail send successfully 👍');
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch(() => {
      return res.status(422).render('auth/signup', {
        path: '/signup',
        title: 'Sign Up',
        errorMessage: 'Something went wrong 😢',
        oldInput: {
          email: email,
          password: password,
          confirmPassword: req.body.confirmPassword,
        },
        validationErrors: errors.array(),
      });
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login');
  });
};

exports.getReset = (req, res) => {
  let errorMessage = req.flash('error');
  errorMessage = errorMessage.length > 0 ? errorMessage[0] : undefined;

  let successMessage = req.flash('success');
  successMessage = successMessage.length > 0 ? successMessage[0] : undefined;

  res.render('auth/reset', {
    path: '/reset',
    title: 'Reset Password',
    errorMessage: errorMessage,
    successMessage: successMessage,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      req.flash('error', 'Something Went Wrong 😢');
      return res.redirect('/reset');
    }

    const token = buffer.toString('hex');

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash('error', 'NO user found ❌');
          console.log('No user found');
          return res.redirect('/reset');
        }

        user.resetToken = token;
        user.resetTokenExpire = Date.now() + 3600000;
        return user.save();
      })
      .then(() => {
        req.flash('success', 'Check your email for the next steps 😎');
        res.redirect('/login');

        const mailOptions = {
          from: 'joelhernandezarg@gmail.com',
          to: req.body.email,
          subject: 'Reset Password',
          html: `
					<h3>You requested a password reset for you account</h3>
					<p>Click this <a href='http://localhost:${process.env.PORT}/reset/${token}'>link</a> to continue.</p>
					`,
        };

        return transporter
          .sendMail(mailOptions)
          .then(() => {
            console.log('Mail send successfully 👍');
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        const error = new Error(err);
        error.statusCode = 500;
        return next(error);
      });
  });
};

exports.getResetPassword = (req, res, next) => {
  const token = req.params.token;

  User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } })
    .then((user) => {
      let errorMessage = req.flash('error');
      errorMessage = errorMessage.length > 0 ? errorMessage[0] : undefined;

      let successMessage = req.flash('success');
      successMessage =
        successMessage.length > 0 ? successMessage[0] : undefined;

      res.render('auth/reset-password', {
        path: '/reset-password',
        title: 'Reset Password',
        errorMessage: errorMessage,
        successMessage: successMessage,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

exports.postResetPassword = (req, res, next) => {
  const password = req.body.password;
  const userId = req.body.userId;
  const token = req.body.passwordToken;
  let user;

  User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() },
    _id: userId,
  })
    .then((u) => {
      if (!u) {
        req.flash('error', 'Something went wrong 😢');
        res.redirect('/reset');
      }
      user = u;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpire = undefined;

      return user.save();
    })
    .then(() => {
      req.flash('success', 'Password changed successfully 👍');
      res.redirect('/login');
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};
