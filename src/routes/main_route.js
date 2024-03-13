const express = require('express');

const isAuth = require('../middlewares/is_auth');
const userController = require('../controllers/user_controller');

const router = express.Router();

router.get('/', isAuth, (req, res, next) => {
  res.render('home/index');
});

router.post('/users/new', userController.postCreateUser)

module.exports = router;