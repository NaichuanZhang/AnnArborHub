var features = []

var app = angular.module('AnnArborHub', []);

app.controller('SearchFood', ['$scope', '$http', function($scope, $http) {

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
      	
      	console.log(features)


      	console.log(response)
      }, function errorCallback(response) {
        alert(" This is a bad keyword attempt, please enter a none empty keyword");
      });

    }
  }
}]);

angular.module('map-example', []).controller('MapController', function($scope, $rootScope, $compile) {


        function initialize() {

            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: { lat: -25.363, lng: 131.044 }
            });



            $scope.cities = [
                { title: 'Sydney', lat: -33.873033, lng: 151.231397 },
                { title: 'Melbourne', lat: -37.812228, lng: 144.968355 }
            ];


            $scope.infowindow = new google.maps.InfoWindow({
                content: ''
            });


            for (var i = 0; i < $scope.cities.length; i++) {


                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.cities[i].lat, $scope.cities[i].lng),
                    map: $scope.map,
                    title: $scope.cities[i].title
                });

                var content = '<a ng-click="cityDetail(' + i + ')" class="btn btn-default">View details</a>';
                var compiledContent = $compile(content)($scope)

                google.maps.event.addListener(marker, 'click', (function(marker, content, scope) {
                    return function() {
                        scope.infowindow.setContent(content);
                        scope.infowindow.open(scope.map, marker);
                    };
                })(marker, compiledContent[0], $scope));

            }

        }

        $scope.cityDetail = function(index) {
            alert(JSON.stringify($scope.cities[index]));
        }

        google.maps.event.addDomListener(window, 'load', initialize);

    });



      // var map;
      // function initMap() {
      // 	console.log("testestetwes")
      //   map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 16,
      //     center: new google.maps.LatLng(-33.91722, 151.23064),
      //     mapTypeId: 'roadmap'
      //   });

      //   var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
      //   var icons = {
      //     parking: {
      //       icon: iconBase + 'parking_lot_maps.png'
      //     },
      //     library: {
      //       icon: iconBase + 'library_maps.png'
      //     },
      //     info: {
      //       icon: iconBase + 'info-i_maps.png'
      //     }
      //   };

      //   var features = [
      //     {
      //       position: new google.maps.LatLng(-33.91721, 151.22630),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91539, 151.22820),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91747, 151.22912),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91910, 151.22907),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91725, 151.23011),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91872, 151.23089),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91784, 151.23094),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91682, 151.23149),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91790, 151.23463),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91666, 151.23468),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.916988, 151.233640),
      //       type: 'info'
      //     }, {
      //       position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
      //       type: 'parking'
      //     }, {
      //       position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
      //       type: 'parking'
      //     }, {
      //       position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
      //       type: 'parking'
      //     }, {
      //       position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
      //       type: 'parking'
      //     }, {
      //       position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
      //       type: 'parking'
      //     }, {
      //       position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
      //       type: 'parking'
      //     }, {
      //       position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      //       type: 'parking'
      //     }, {
      //       position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      //       type: 'library'
      //     }
      //   ];

      //   // Create markers.
      //   features.forEach(function(feature) {
      //     var marker = new google.maps.Marker({
      //       position: feature.position,
      //       icon: icons[feature.type].icon,
      //       map: map
      //     });
      //   });
      // }

      // function clearMarkers() {
      // 	setMapOnAll(null);
      // }



