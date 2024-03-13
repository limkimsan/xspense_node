const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const userConst = require('../constants/user_constant');

exports.postCreateUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then(hashedPwd => {
      return User.create({
        id: crypto.randomUUID(),
        name: req.body.name || '',
        email: req.body.email,
        password: hashedPwd,
        role: userConst.role.normal
      });
    })
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        res.redirect('/');
      });
    })
    .catch(err => {
      res.redirect('/signup');
    })
}