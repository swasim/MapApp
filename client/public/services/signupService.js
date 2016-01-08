app.service('signupService', function ($http) {

  this.signUp = function (username, password, email) {

    var signupUser = {
      username : username,
      password : password,
      email : email
    };

    return $http.post("/newUser", signupUser)//newUser is a placeholder
      .then(function (success) {
        return success.body;
      }, function (error) {
        //bad post
      })
  }

})
