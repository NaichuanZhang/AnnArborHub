var app = angular.module('AnnArborHub', []);

app.controller('searchResult', ['$scope', '$http', function($scope, $http, $window) {
     $scope.toNews = function() {
         window.location.href = "news.html";
     };

     $scope.toRes = function() {
         window.location.href = "restaurant.html";
     };

     $scope.toEvents = function() {
         window.location.href = "events.html";
     };

     $scope.toHome = function() {
         window.location.href = "index.html";
     };

     $scope.toIntro = function() {
         window.location.href = "intro.html";
     };
}]);