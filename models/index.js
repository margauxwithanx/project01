/* INDEX.JS
-------------------------------------------------*/

var mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/travelmate' 
);

var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
  	console.log("Hello There");
});
	
var Place = require('./place.js');
var User = require('./user.js');


module.exports.Place = require('./place.js');
module.exports.User = require('./user.js');
