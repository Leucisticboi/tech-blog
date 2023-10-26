const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const Session = require('./models/Session');
const path = require('path')
const routes = require('./controllers')
require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = 3001;

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

Session.sync();

const hbs = exphbs.create({
    // Specify default layout file
    defaultLayout: 'main',
    // Specify layouts directory
    layoutsDir: path.join(__dirname, 'views/layouts'),
});

app.use(session(sess));

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});