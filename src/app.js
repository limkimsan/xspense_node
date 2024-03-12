const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { doubleCsrf } = require("csrf-csrf");
const cookieParser = require('cookie-parser');

const sequelize = require('./utils/database');
const User = require('./models/user');
const routes = require('./routes/route');
const authRoutes = require('./routes/auth_route');

const SECRET = 'my secret';
const app = express();

const sessionStore = new MySQLStore({
  host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'MySql@2024',
	database: 'xspense-track'
});

const {
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => SECRET,
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
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(routes);
app.use(authRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });