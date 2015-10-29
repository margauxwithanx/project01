$(document).ready(function(){

//check to see who's online
  function checkAuth() {
   $.ajax({
    url:'/current_user',
    type: 'GET'
   })
   .done(function (data){

    if(data.user){
      $('.not-logged-in').hide();
      $('.logged-in').show();
      $('#greeting').text("Hello " + data.user.username + "!");
    } else {
      $('.not-logged-in').show();
      $('.logged-in').hide();
    }
   })
   .fail(function (data) {
    console.log(data);
   });
  }

  checkAuth();


  $('#sign-up-form').validate({
      rules: {
        firstname:{
          required:true,
          minlength:6
        },
        lastname:{
          required:true,
          minlength:6
        },
        username:{
          required:true,
          minlength:6
        },
        email:{
          required:true,
          email:true
        },
          password:{
            required:true,
              minlength : 8
          },
          confirmPassword : {
            required:true,
              minlength : 8,
              equalTo : "#password"
          }
      },
      messages:{
        username:{
          required:"Please enter a username.",
          minlength:"Username must consist of at least 6 characters."
        },
          password:{
            required:"You must enter a password.",
            minlength:"Your password must be more than 8 characters."
          },
          confirmPassword:{
              required: "You must confirm your password.",
              minlength: "Your password must contain more than 8 characters.",
              equalTo: "Your passwords must match." 
          }
      }
  });

  $('#log-in-form').validate({
    rules: {
      username:{
        required:true,
        email:true
      },
      password:{
        required:true,
        minlength:8
      }
    },
    messages: {
      email:{
        required:"Enter your account's email"
      },
      password:{
        required: "You must enter your password",
        minlength: "Your password must be more than 8 characters"
      }
    }
  });


  //Sign Up Post

  $('#sign-up-form').on('submit', function(e) {
    e.preventDefault();

          var password = $('#password').val();
          var confirmPassword = $('#confirmPassword').val();
        if(password === confirmPassword) {

      var signUpForm = $(this).serialize();

      $.ajax({
          url: "/api/users",
          type: "POST",
          data: signUpForm
      })
      .done(function (data) { 
        console.log(data);
        $('#sign-up-form').trigger("reset");
        $('#sign-up-modal').modal('hide');
        $('#greeting').text("Hello " + data.firstname + "!");
        $('.not-logged-in').hide();
        $('.logged-in').show();
      })
      .fail(function (data) { 
        console.log(data);
      });
    } else {
      alert("INCORRECT PASSWORD");
    }
  });


  //Login Post

  $('#log-in-form').on('submit', function(e) {

    e.preventDefault();
    var loginForm = $(this).serialize();

    $.ajax({
      url: "/login",
      type: "POST",
      data: loginForm
    })
    .done( function (data) {
      console.log(data.username + " LOGGED IN!");
      $('#log-in-form').trigger("reset");
      $('#login-modal').modal('hide');
      $('.not-logged-in').hide();
      $('.logged-in').show();
      $('#greeting').text("Hello " + data.username + "!");
    })
    .fail( function (data) {
      console.log(data);
    });
  });


  //Logout get

  $('#logout-btn').on('click', function (e) {
    e.preventDefault();


    $.ajax({
      url: "/logout",
      type: "GET"
    }).done(function (data) {
      console.log("LOGGED OUT!");
      $('.not-logged-in').show();
      $('.logged-in').hide();
    }).fail(function (data) {
      alert("Failed to log out!");
    });
  });

  

  //BOOTSTRAP MODAL
  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus();
  }); 
});  