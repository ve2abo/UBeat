var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var cors = require('cors');
var passport = require('passport');

var security = require('./security');
var login = require('./routes/login');
var user = require('./routes/user');

var app = express();
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'ubeat_session_secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

app.get('/', login.login);
app.get('/login', login.login);
app.get('/auth/google', login.loginWithGoogle, security.googleAuth);
app.get('/auth/google/return', security.googleAuth, login.loginWithGoogleCallback);
app.get('/logout', login.logout);
app.get('/account', security.isAuthenticated, user.account);

var port = process.env.PORT || 3000;
app.listen(port);