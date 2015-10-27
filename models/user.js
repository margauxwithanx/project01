// user.js

// require dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


// define user schema
var userSchema = new Schema({
   firstname: String,
   lastname: String,
   email: String,
   passwordDigest: String
});

// create a new user with secure (hashed) password
userSchema.statics.createSecure = function (firstname, lastname, username, email, password, callback) {
  // `this` references our schema 
  // store it in variable `user` because `this` changes context in nested callbacks
  var userModel = this;
    console.log("this inside createSecure:", user);

  // hash password user enters at sign up
  bcrypt.genSalt(10,function (err, salt) {
    console.log('salt: ', salt);  // changes every time
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);

      // create the new user (save to db) with hashed password
      userModel.create({ //Looks like Model
        firstname: firstname,
        lastname: lastname,
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

// authenticate user (when user logs in)
userSchema.statics.authenticate = function (username, password, callback) {
  // find user by username entered at log in
  this.findOne({username: username}, function (err, foundUser) {
    console.log(foundUser);

    // throw error if can't find user
    if (!foundUser) {
      console.log('No user with email ' + email);
      callback("Error: no user found", null); 
    // if found user, check if password is correct
    } else if (foundUser.checkPassword(password)) {
      callback(null, foundUser);
    } else {
      callback ("Error: incorrect password", null);
    }

  });
};

// compare password user enters with hashed password (`password`)
userSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `password`
  return bcrypt.compareSync(password, this.passwordDigest);
};


// // export user model// define user model; need the above before can turn it into a model
module.exports = mongoose.model('User', userSchema);
//var User = mongoose.model('User', userSchema);

// // export user model
// module.exports = User;