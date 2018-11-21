var app = angular.module('AnnArborHub', []);

app.controller('events', ['$scope', '$http', function($scope, $http, $window) {

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
    $scope.eventRes = []
    $scope.search = function(keycode){
        if(keycode == 13) {
            var qString = '48105';
            if ($scope.queryString != undefined) {
                qString = $scope.queryString;
                console.log('fdkjfkdfj')
            }
            console.log(qString)
            qUrl    = "https://api.seatgeek.com/2/events?client_id=MTM5ODM3NzJ8MTU0MjUwMTU4My44OA&client_secret=cf1451f77306a0e0a6d60151c6e58711c3407dd116240d5ccec1617c20f3d2a4&postal_code=" + qString
            $http({
                method: 'get',
                url: qUrl,
                //
                // headers: {
                //     "user-key": "0e1f9f99e122eeb1e4108d8d2d02a0d3"},
            }).then(function successCallback(response) {
                markers = []
                $scope.eventRes = []
                console.log(response)
                var events = response.data.events;
                for (i=0; i < 10; i++ ){
                    $scope.eventRes.push(events[i])
                    markers.push({
                        "title": events[i]["title"],
                        "lat" : events[i]["venue"]["location"]["lat"],
                        "lng" : events[i]["venue"]["location"]["lon"],
                        "description": events[i]["title"] + ", " + events[i]["datetime_local"] +
                            ", " + events[i]["url"]
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

            }, function errorCallback(response) {
                alert(" This is not a valid zip code");
            });

        }
    }

    $scope.toNews = function() {
        console.log("666666");
         window.location.href = "news.html";
     };

     $scope.toRes = function() {
         window.location.href = "restaurant.html";
     };

     // $scope.toEvents = function() {
     //     window.location.href = "events.html";
     // };

     $scope.toHome = function() {
        console.log("666");
        window.location.href = "index.html";
     };
    $scope.zoomto=function(index){
        $scope.Map.setZoom(17);
        var location = new google.maps.LatLng($scope.Markers[index].lat,$scope.Markers[index].lng)
        $scope.Map.panTo(location)
    }
    $scope.init = function () {
        $scope.search(13);
    }




}]);