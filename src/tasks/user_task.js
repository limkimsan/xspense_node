const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const userConst = require('../constants/user_constant');

const createPrimaryAdmin = () => {
  bcrypt.hash('12345678', 12)
    .then(hashedPwd => {
      User.create({
        id: crypto.randomUUID(),
        name: 'admin',
        email: 'admin@xspense.com',
        password: hashedPwd,
        role: userConst.role.primary_admin
      });
    });
}

createPrimaryAdmin();