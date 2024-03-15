const express = require('express');

const isAuth = require('../middlewares/is_auth');
const userController = require('../controllers/user_controller');
const categoryController = require('../controllers/category_controller');
const { validateUser, validateEditUser } = require('../middlewares/validation');

const router = express.Router();

router.get('/', isAuth, (req, res, next) => {
  res.render('home/index', {
    path: '',
    message: '',
    messageType: ''
  });
});

router.get('/users', isAuth, userController.getUsers);

router.get('/users/new', isAuth, userController.getCreateUser)

router.post('/users/new', validateUser(), isAuth, userController.postCreateUser)

router.get('/users/:userId', isAuth, userController.getEditUser)

router.post('/users/:userId', validateEditUser(), isAuth, userController.postEditUser);

router.get('/categories', isAuth, categoryController.getCategories);

module.exports = router;