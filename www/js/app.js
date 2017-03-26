// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.controller('main',function($scope, $http){

   $scope.colors = ["#90A4AE","#546E7A","#757575","#F57C00","#FFC107","#FFEB3B","#FFF176","#FFE082","#FF8F00","#009688","#29B6F6","#B3E5FC"];
   $scope.color = $scope.colors[Math.floor(Math.random() * $scope.colors.length)];

  $http.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=8157387332726bbbabb950ab918781d5&tags=peace&format=json&nojsoncallback=1").then(
      function(data){
        $scope.backgroundImage = data.data.photos.photo;
        $scope.next();
      }
    );



  $scope.getNewQuote = function () {
    $http.get("http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en")
    .then(function(response) {
        $scope.quote = response.data.quoteText;
        $scope.auth = response.data.quoteAuthor;
    });
    $scope.next();
    $scope.color = $scope.colors[Math.floor(Math.random() * $scope.colors.length)];
  }

  $scope.next = function () {
      var nRandom = Math.floor(Math.random() * $scope.backgroundImage.length);
      var oRandom = $scope.backgroundImage[nRandom];
        $scope.current = {file: 
        "https://farm" + oRandom.farm + ".staticflickr.com/" + oRandom.server
        + "/" + oRandom.id + "_" + oRandom.secret + ".jpg"};
    };
});


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
