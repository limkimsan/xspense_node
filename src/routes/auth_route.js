const express = require('express');

const authController = require('../controllers/auth_controller');
const userController = require('../controllers/user_controller');
const { validateUser } = require('../middlewares/validation');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup', validateUser(), userController.postCreateUser)

module.exports = router;