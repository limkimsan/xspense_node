require('dotenv').config()

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { doubleCsrf } = require("csrf-csrf");
const cookieParser = require('cookie-parser');

// const sequelize = require('./utils/database');
const sequelize = require('../config/database');

const mainRoutes = require('./routes/main_route');
const authRoutes = require('./routes/auth_route');
const userConst = require('./constants/user_constant');

const SECRET = 'my secret';
const app = express();

const sessionStore = new MySQLStore({
  host: 'localhost',
	port: 3306,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
});

const {
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => SECRET,
  size: 32,
  getTokenFromRequest: (req) => {
    return req.body._csrf;
  },
});

app.set('view engine', 'ejs');  // Using ejs as the view engine
app.set('views', 'src/views');   // implies that Express should look for view files inside a directory named "views"

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(cookieParser(SECRET));
app.use(doubleCsrfProtection);

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.isPrimaryAdmin = (!!req.session.user && req.session.user.role == userConst.role.primary_admin) ? true : false;
  res.locals.user = req.session.user;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(mainRoutes);
app.use(authRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });