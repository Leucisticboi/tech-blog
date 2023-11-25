// Import dotenv package to use environment variables
require('dotenv').config();
// Import path package and express packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// Import sequelize store package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import routes, sequelize connection, and helpers
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Initialize express app and set port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up session
const sess = {
  secret: 'Super Duper Secret Secret',
  cookie: {
    // Session will automatically expire in 10 minutes
    expires: 10 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use session
app.use(session(sess));

// Set up handlebars engine
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up express app to handle data parsing and serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use express app to handle routes
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now listening on port: ${PORT}`));
});