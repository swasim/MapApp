app.service('httpService', ['$http', function ($http) {

  this.signUp = function (username, password, email) {

    var signupUser = {
      username : username,
      password : password,
      email : email
    };

    //signing up a new user
    return $http.post("/api/users", signupUser)
      .then(function (success) {
        return success.body;
      }, function (error) {
        return error;
        console.log(error);
      });
  };

  //adding favorite to users list of favorites
  this.sendFavorite = function (favorite) {

    var addToFavorites = {
      favorites: favorite
    };

    return $http.put("/api/users", addToFavorites)
      .then(function (success) {
        return success;
      }, function (error) {
        return error;
      });
  };

  //login functionality
  this.login = function () {
    $http.get('/login')
      .then(function (success) {
        return success;
      }, function (error) {
        return error;
      });
  };

  //getting tweets
  this.getTweets = function (searchTerm) {

    var getRequestGoesTo = '/api/tweets/' + searchTerm;

    return $http.get(getRequestGoesTo)
      .then(function (success) {
        return success.data;
      }, function (error) {
        return error;
      });
    
    // return $http.get(getRequestGoesTo)
    //   .then(function (tweetData) {
    //     var map = window.map;
    //     //var lat = tweet lat
    //     var lat = 51.5073509;
    //     var lng = -0.1277583
    //     //var lng = tweet lng
    //     //var tweetContents = tweet content
    //     var tweetContents = '<div>lets hope this works</div>';

    //     var markerLocation = new google.maps.LatLng(lat, lng)

    //     var marker = new google.maps.Marker({
    //       position: markerLocation
    //     });

    //     //setting info window for map
    //     var contentString = '<div>' + tweetContents + '</div>';
        
    //     var infoWindow = new google.maps.InfoWindow({
    //       content: contentString
    //     });

    //     marker.addListener('mouseover', function () {
    //       infoWindow.open(map, marker)
    //     });

    //     marker.addListener('mouseout', function () {
    //       infoWindow.close();
    //     })

    //     marker.setMap(map);

    //   }, function (error) {

    //   })
  }

}]);
