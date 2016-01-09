app.service('httpService', ['$http', function ($http) {

  this.signUp = function (username, password, email) {

    var signupUser = {
      username : username,
      password : password,
      email : email
    };

    return $http.post("/api/users", signupUser)//newUser is a placeholder
      .then(function (success) {
        return success.body;
      }, function (error) {
        //error
        console.log(error);
      });
  }

  this.getTweetsOntoMap = function (searchTerm) {

    var getRequestGoesTo = '/api/tweets/' + searchTerm;
    
    return $http.get(getRequestGoesTo)
      .then(function (tweetData) {
        //var map = googleMap
        //var lat = tweet lat
        //var lng = tweet lng
        //var tweetContents = tweet content

        var markerLocation = new google.maps.LatLng(lat, lng)

        var marker = new google.maps.Marker({
          position: markerLocation
        });

        //setting info window for map
        var contentString = '<div>' + tweetContents + '</div>';
        
        var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker.addListener('mouseover', function () {
          infoWindow.open(map, marker)
        });

        marker.addListener('mouseout', function () {
          infoWindow.close();
        })

        marker.setMap(map);

      }, function (error) {

      })

}]);
