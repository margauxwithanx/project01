/* ROUTES: USER
-------------------------------------------------*/
// define REST endpoints (routes)
var router = express.Router();

app.use('/api', router);  // prefix all endpoints with /api

router.route('/users')

  // curl -H "Content-Type: application/json" -X POST -d '{"firstname":"aaron", "lastname":"cody", "email":"aaron@aaron.com", "passwordDigest":"djhgfdshgfjhdg"}' http://localhost:8080/api/users/
  // .post(function(req,res){  // creates new user

  //   var user = db.user.createSecure();
  //   user.firstname = req.body.firstname;
  //   user.lastname = req.body.lastname;
  //   user.email = req.body.email;
  //   user.passwordDigest = req.body.passwordDigest;

  //   user.save(function(err){
  //     if (err)
  //       res.send(err);

  //     var msg = 'creating new user...'+user.firstname;
  //     res.json({message: msg});
  //     console.log(msg);

  //   });

  // })

  // curl -X GET http://localhost:8080/api/users/
  .get(function(req,res){   // gets all users

    db.User.find(function(err, users){
      if (err)
        res.send(err);

      var msg = 'getting all users...:'+users;
      console.log(msg);

      res.json(users);
    });

  });

router.route('/users/:user_id')

  // curl -X GET http://localhost:8080/api/users/562c59bb3a7ac1210abd150c/
  .get(function(req,res){   // gets user by id

    db.User.findById(req.params.user_id, function(err, user){
      if (err)
        res.send(err);

      var msg = 'getting user by id...:'+user;
      console.log(msg);

      res.json(user);
    });


  })

  // curl -H "Content-Type: application/json" -X PUT -d '{"firstname" : "fred"}' http://localhost:8080/api/users/562c59bb3a7ac1210abd150c/
  .put(function(req,res){   // update user by id

    db.User.findById(req.params.user_id, function(err, user){
      
      if (err)
        res.send(err);

      if(req.body.firstname)
        user.firstname = req.body.firstname;

      if(req.body.lastname)
        user.lastname = req.body.lastname;

      if(req.body.email)
        user.email = req.body.email;

      if(req.body.passwordDigest)
        user.passwordDigest = req.body.passwordDigest;

      user.save(function(err){
        if (err)
          res.send(err);

        var msg = 'updated user...'+user.firstname;
        res.json({message: msg});
        console.log(msg);

      });

    });

  })

  // curl -X DELETE http://localhost:8080/api/users/562c59bb3a7ac1210abd150c/
  .delete(function(req,res){   // delete user by id

    db.User.remove({_id:req.params.user_id}, function(err, user){

      if (err)
        res.send(err);

      var msg = 'deleted user...'+req.params.user_id;
      res.json({message: msg});
      console.log(msg);

    });

  });


/* ROUTES: PLACES
-------------------------------------------------*/
router.route('/places')

  // curl -H "Content-Type: application/json" -X POST -d '{"locationCoordinates":"Zazie", "city":"SanFrancisco", "type":"restaurant", "creator":"user"}' http://192.168.0.125:8080/api/places/
  .post(function(req,res){  // creates new place

    console.log("creating new place...");

    var place = new Place();
    place.locationCoordinates = req.body.locationCoordinates;
    place.city = req.body.city;
    place.type = req.body.type;
    place.creator = req.body.creator;
    place.notes = req.body.notes;
    place.cost = req.body.cost;
    place.rating = req.body.rating;
    place.url = req.body.url;

    place.save(function(err){
      if (err)
        res.send(err);

      var msg = 'creating new place...'+place.locationCoordinates;
      res.json({message: msg});
      console.log(msg);

    });

  })

  // curl -X GET http://localhost:8080/api/places/
  .get(function(req,res){   // gets all places

    db.Place.find(function(err, places){
      if (err)
        res.send(err);

      var msg = 'getting all places...:'+places;
      console.log(msg);

      res.json(places);
    });

  });

router.route('/places/:place_id')

  // curl -X GET http://localhost:8080/api/places/45/
  .get(function(req,res){   // gets place by id

    db.Place.findById(req.params.place_id, function(err, place){
      if (err)
        res.send(err);

      var msg = 'getting place by id...:'+place;
      console.log(msg);

      res.json(place);
    });


  })

  // curl -H "Content-Type: application/json" -X PUT -d '{"locationCoordinates" : "HotelWhitcomb"}' http://localhost:8080/api/places/
  .put(function(req,res){   // update place by id

    db.Place.findById(req.params.place_id, function(err, place){
      
      if (err)
        res.send(err);

      if(req.body.locationCoordinates)
        place.locationCoordinates = req.body.locationCoordinates;

      if(req.body.city)
        place.city = req.body.city;

      if(req.body.type)
        place.type = req.body.type;

      if(req.body.creator)
        place.creator = req.body.creator;

       if(req.body.notes)
        place.notes = req.body.notes;

       if(req.body.cost)
        place.cost = req.body.cost;

       if(req.body.rating)
        place.rating = req.body.rating;

       if(req.body.url)
        place.url = req.body.url;

      place.save(function(err){
        if (err)
          res.send(err);

        var msg = 'updated place...'+place.locationCoordinates;
        res.json({message: msg});
        console.log(msg);

      });

    });

  })

  // curl -X DELETE http://localhost:8080/api/places/
  .delete(function(req,res){   // delete place by id

    db.Place.remove({_id:req.params.place_id}, function(err, place){

      if (err)
        res.send(err);

      var msg = 'deleted place...'+req.params.place_id;
      res.json({message: msg});
      console.log(msg);

    });

  });