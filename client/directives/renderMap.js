var renderMap = angular.module('renderMap', []);

renderMap.directive('renderMap', function(){
  

  //define function to be attributed to the link property on the returned object below
  var link = function(scope, element, attrs) {  
      //define map elements/styles
      var map;
      var mapMarkers = [];
      var markerLimit = 5; 
      var styles = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
      
      //configure the map
      var mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 2,
          scrollwheel: false,
          styles: styles
      };
      
      //define function that will inititialize the map
      var initMap = function() {
          if (map === void 0) {
              map = new google.maps.Map(element[0], mapOptions);
          }
      };
      
      //NOTE: not 100%, but pretty sure we should initialize map here;
      initMap();

      //set up a watch on scope, connecting the custom renderMap directive to the mapsPageController; this $watch.collection
      //will be watching for changes in the tweets.data variable defined in mapsPageController
      scope.$watchCollection('tweets.data', function(newValue, oldValue){

          //go through each NEW tweet and attribute its text/location attributes to a pin on the map
           angular.forEach(scope.tweets.data, function(tweet){
            //check if mapMarkers length is greater than or equal to marker limit; if so, remove oldest pin;
            //DOUBLE CHECK THAT THIS REFERENCES CORRECTLY
            if(mapMarkers.length >= markerLimit){
              var pinToRemove = mapMarkers.shift();
              pinToRemove.setMap(null);
            };

            //determine map marker location/shape for each tweet
             var tweetLocation = new google.maps.LatLng(tweet["location"][0],tweet["location"][1]);
             var tweetMarker = new google.maps.Marker({
               position: tweetLocation,
               map: map
             });

             //determine content added to info window on each marker  
             var tweetContent = '<div>' + tweet['text'] + '</div>';
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

    
             //set tweet on map...
             tweetMarker.setMap(map, tweetLocation, tweetContent);
             //add new tweets to mapMarkers array and setMap
             mapMarkers.push(tweetMarker);
             //removing last proessed tweet info from scope.tweets.data
             scope.tweets.data.shift();
             },true);

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

