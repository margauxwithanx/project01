/* GENERAL 
-------------------------------------------------*/

// require express framework and additional modules
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var db          = require ('./models/index.js');
var session    = require('express-session');

var port = process.env.PORT || 8080;

// var User = require ('./models/user.js');
// var Place = require ('./models/place.js');

// connect to database
// run mongod in another Terminal tab
mongoose.connect('mongodb://localhost/travelmate');

//API ENV setup

// var gMaps = process.env.G_API_KEY;
// app.use(cookieParser());

/* MIDDLEWARE
-------------------------------------------------*/

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 30 * 60 * 1000 }
}));




/* GET MAP
-------------------------------------------------*/

app.get('/map', function (req, res){
  res.render('map.ejs');
});

app.get('/', function (req, res){
  res.render('index.ejs');
});



/* SIGNUP & LOGIN
-------------------------------------------------*/
// signup route with placeholder response
app.get('/signup', function (req, res) {
  res.render('signup');
});

// login route with placeholder response
app.get('/login', function (req, res) {
  res.render('login');
});

// Sign up route - creates a new user with a secure password
app.post('/users', function (req, res) {
  
  console.log (req.body);
  // use the email and password to authenticate here
  db.User.createSecure(req.body.firstname, req.body.lastname, req.body.email, req.body.username, req.body.password, function (err, user) {
    console.log (err, user);
    res.json(user);
  });
});

app.get("/users/user", function (req, res) {
  db.User.find().exec(function (err, users) {
    res.json(users);
  });
  
});

app.post('/places', function (req, res){
  console.log( req.body );
  // Place.create(req.body.)
});



/* PORT
-------------------------------------------------*/
app.listen(port, function () {
  console.log('server started on locahost:'+port);
});