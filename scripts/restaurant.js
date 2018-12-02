
var app = angular.module('AnnArborHub', []);

app.controller('restaurant', ['$scope', '$http', function($scope, $http, $window) {
    var markers = []
    $scope.results = [];
      $scope.toNews = function() {
        console.log("666666");
         window.location.href = "news.html";
     };

     $scope.toRes = function() {
         window.location.href = "restaurant.html";
     };

     $scope.toEvents = function() {
         window.location.href = "events.html";
     };

     $scope.toHome = function() {
        console.log("666");
        window.location.href = "index.html";
     };

     $scope.share = function(index){
      console.log("toEvents")
      
    var btn = document.getElementById(index);
    console.log(btn)
    var clipboard = new ClipboardJS(btn);
    clipboard.on('success', function(e) {
        console.log(e);
    });
    clipboard.on('error', function(e) {
        console.log(e);
    });
    }
     //Initialize Map
      $scope.MapOptions = {
                center: new google.maps.LatLng(42.2808256, -83.7430),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
 
    //Initializing the InfoWindow, Map and LatLngBounds objects.
    $scope.InfoWindow = new google.maps.InfoWindow();
    $scope.Latlngbounds = new google.maps.LatLngBounds();
    $scope.Map = new google.maps.Map(document.getElementById("dvMap"), $scope.MapOptions);

     $scope.init = function(){
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
          $scope.results.push(response.data.restaurants[i]["restaurant"])
          markers.push({
            "title": restaurants[i]["restaurant"]["name"],
            "lat" : restaurants[i]["restaurant"]["location"]["latitude"],
            "lng" : restaurants[i]["restaurant"]["location"]["longitude"],
            "description":"Name: " +restaurants[i]["restaurant"]["name"] +"\n" +"Cuisines: " + restaurants[i]["restaurant"]["cuisines"]
          })
        }
        console.log(markers)
        $scope.Markers = markers

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
      }, function errorCallback(response) {
        alert(" This is a bad keyword attempt, please enter a none empty keyword");
      });
     }

     $scope.zoomto=function(index){
        $scope.Map.setZoom(17);
        var location = new google.maps.LatLng($scope.Markers[index].lat,$scope.Markers[index].lng)
        $scope.Map.panTo(location)


     }
}]);






