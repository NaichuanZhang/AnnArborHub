var features = []

var app = angular.module('AnnArborHub', []);

app.controller('SearchFood', ['$scope', '$http', function($scope, $http) {
  var markers = [];


   $scope.MapOptions = {
                center: new google.maps.LatLng(42.2808256, -83.7430),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
 
            //Initializing the InfoWindow, Map and LatLngBounds objects.
            $scope.InfoWindow = new google.maps.InfoWindow();
            $scope.Latlngbounds = new google.maps.LatLngBounds();
            $scope.Map = new google.maps.Map(document.getElementById("dvMap"), $scope.MapOptions);

	  $scope.search = function(keycode){
    if(keycode == 13) {
      var qString = $scope.queryString,
          qUrl    = "https://developers.zomato.com/api/v2.1/search?entity_id=118000&entity_type=subzone&radius=5000"
      $http({
        method: 'get',
        url: qUrl,

        headers: {
        	"user-key": "0e1f9f99e122eeb1e4108d8d2d02a0d3"},
      }).then(function successCallback(response) {
        console.log(response)
        var restaurants = response.data.restaurants
        for (i=0; i < 10; i++ ){
          markers.push({
            "title": restaurants[i]["restaurant"]["name"],
            "lat" : restaurants[i]["restaurant"]["location"]["latitude"],
            "lng" : restaurants[i]["restaurant"]["location"]["longitude"],
            "description":restaurants[i]["restaurant"]["cuisines"]
          })
        }
        console.log(markers)
        $scope.Markers = markers

        //Setting the Map options.
        $scope.MapOptions = {
            center: new google.maps.LatLng($scope.Markers[0].lat, $scope.Markers[0].lng),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        //Initializing the InfoWindow, Map and LatLngBounds objects.
        $scope.InfoWindow = new google.maps.InfoWindow();
        $scope.Latlngbounds = new google.maps.LatLngBounds();
        $scope.Map = new google.maps.Map(document.getElementById("dvMap"), $scope.MapOptions);

        //Looping through the Array and adding Markers.
        for (var i = 0; i < $scope.Markers.length; i++) {
            var data = $scope.Markers[i];
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);

            //Initializing the Marker object.
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: $scope.Map,
                title: data.title
            });

            //Adding InfoWindow to the Marker.
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    $scope.InfoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
                    $scope.InfoWindow.open($scope.Map, marker);
                });
            })(marker, data);

            //Plotting the Marker on the Map.
            $scope.Latlngbounds.extend(marker.position);
        }

        //Adjusting the Map for best display.
        $scope.Map.setCenter($scope.Latlngbounds.getCenter());
        $scope.Map.fitBounds($scope.Latlngbounds);
      	
      	console.log(features)
      }, function errorCallback(response) {
        alert(" This is a bad keyword attempt, please enter a none empty keyword");
      });

    }
  }


}]);

