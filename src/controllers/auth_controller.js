const bcrypt = require('bcryptjs');

const User = require('../models/user');

const renderLoginPage = (res, email) => {
  res.render('auth/login', {
    oldInput: {
      email: email,
      password: ''
    },
    message: '',
    messageType: ''
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
  req.session.isLoggedIn = true;

  User.findOne({
    where: {
      email: email
    }
  })
  .then(user => {
    if (!user)
      return renderLoginPage(res, email);

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

        renderLoginPage(res, email);
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