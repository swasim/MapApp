var renderMap = angular.module('renderMap', []);

renderMap.directive('renderMap', function(){
  

  //define function to be attributed to the link property on the returned object below
  var link = function(scope, element, attrs) {  
      var map;
      var mapMarkers = [];
      var styles = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
      
      // configure the map
      var mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 2,
          scrollwheel: false,
          styles: styles
      };
      
      // inititialize the map
      var initMap = function() {
          if (map === void 0) {
              map = new google.maps.Map(element[0], mapOptions);
          }
      }

      scope.$watchCollection('tweets.data', function (newValue, oldValue) {
        console.log("sucessfully watching");

        initMap();

        for (var i = 0; i < mapMarkers.length; i++) { //do we need to use mapMarkers?? -egan
         mapMarkers[i].setMap(null);
        }
        //go through each tweet and attribute its text/location attributes to a pin on the map
        angular.forEach(scope.tweets.data, function(tweet){

          //determine map marker location/shape for each tweet
          var tweetLocation = new google.maps.LatLng(tweet["location"][0],tweet["location"][1]);
          var tweetMarker = new google.maps.Marker({
            position: tweetLocation,
            map: map
          });

          mapMarkers.push(tweetMarker);
          //NOTE: attempted to make the marker a circle vs. a pin 
          // var tweetMarkerShape = new google.maps.MarkerShape({
          //   circle: [tweetLocation[0], tweetLocation[1], '10px']
          // });
          //determine content added to info window on each marker
          // var tweetContent = '<div>' + tweet['text'] + '</div>';
          var tweetContent = '<div>wazzzuppppp</div>';
          var markerInfoWindow = new google.maps.InfoWindow({
            content: tweetContent
          });
          //set up listeners for each tweetMarker...
          tweetMarker.addListener('mouseover', function () {
            markerInfoWindow.open(map, tweetMarker);
          });
          tweetMarker.addListener('mouseout', function () {
            markerInfoWindow.close();
          });
          tweetMarker.setMap(map, tweetLocation, tweetContent);//need to user tweetLocation? / tweetContent here???? -egan

          //getting rid of the tweet whose contents have just been rendered (we do not want to go through the array multiple times)
          var renderedTweet = scope.tweets.data.shift();
          scope.renderedTweets.push(renderedTweet);
          //history of rendered tweets stored in an array

          //this sets the limit for tweets on the
          if(scope.renderedTweets.length > 5000) {
            scope.renderedTweets.shift();
          }
        }
        ,true);
          
        });   
      };
  
  //custom directives expect a return object in the format below...
  return {
      //restrict specifies how directive can be invoked on DOM
      restrict: 'E',
      replace: false,
      link: link
  };

});

