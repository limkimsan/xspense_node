const express = require('express');

const isAuth = require('../middlewares/is_auth');
const userController = require('../controllers/user_controller');
const { validateUser } = require('../middlewares/validation');

const router = express.Router();

router.get('/', isAuth, (req, res, next) => {
  res.render('home/index', {
    message: '',
    messageType: ''
  });
});

router.post('/users/new', validateUser(), userController.postCreateUser)

module.exports = router;