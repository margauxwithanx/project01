/* PLACE.JS
-------------------------------------------------*/

// require dependencies
var mongoose = require('mongoose');

// define user schema
var PlaceSchema = mongoose.Schema({
   placeName: String,
   address: String,
   latitude: { type: Number, required: true},
   longitude: { type: Number, required: true},
   		placeVisited: String,
   		pricing: String,
  		   rating: String,
   		notes: String,
         createdAt: {type: Date, required: true, expireAfterSeconds: 3600, default: Date.now}
   		
});

var Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;