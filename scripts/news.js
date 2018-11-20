var app = angular.module('AnnArborHub', []);

app.controller('news', ['$scope', '$http', function($scope, $http, $window) {
     // $scope.toNews = function() {
     //    console.log("666666");
     //     window.location.href = "news.html";
     // };

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
}]);