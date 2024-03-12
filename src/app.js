const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
const User = require('./models/user');
const routes = require('./routes/route');
const authRoutes = require('./routes/auth_route');

const app = express();2

app.set('view engine', 'ejs');  // Using ejs as the view engine
app.set('views', 'src/views');   // implies that Express should look for view files inside a directory named "views"

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));
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