const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const renderLoginPage = (res, email, message, messageType) => {
  res.render('auth/login', {
    oldInput: {
      email: email,
      password: ''
    },
    message: message,
    messageType: messageType
  });
}

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    oldInput: {
      email: '',
      password: '',
    },
    message: '',
    messageType: ''
  });
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {    
    const message = errors.array()[0].msg;
    return renderLoginPage(res, '', message, 'error');
  }

  User.findOne({
    where: {
      email: email
    }
  })
  .then(user => {
    if (!user)
      return renderLoginPage(res, email, 'Account is not exist!', 'error');

    bcrypt.compare(password, user.password)
      .then(matched => {
        if (matched) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log('= save session error = ', err);
            res.redirect('/');
          });
        }

        renderLoginPage(res, email, 'Incorrect password!', 'error');
      })
      .catch(err => {
        res.redirect('/login');
      });
  });
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

exports.getSignup = (req, res, next) => {
  res.render('users/new', {
    path: '/signup',
    message: '',
    messageType: ''
  })
}