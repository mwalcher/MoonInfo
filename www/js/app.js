// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var MoonInfo = angular.module('MoonInfo', ['ionic','ui.router','ngSanitize'])

.run(function($ionicPlatform, $rootScope, $location, $state) {

  $rootScope.goBack = function() {
    $location.path('/week');
  };

  $rootScope.nextWeek = function() {
    count = count +7;
    getWeek();
    $state.reload();
  };

  $rootScope.lastWeek = function() {
    count = count -7;
    if(count < 0){count = 0;}
    getWeek();
    $state.reload();
  };

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

MoonInfo.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/week");
  $stateProvider
    .state('week', {
      url: "/week",
      templateUrl: "partials/week.html",
      controller: 'WeekController'
    })
    .state('day', {
      url: "/day?timeStamp",
      templateUrl: "partials/day.html",
      controller: 'DayController'
    });
}]);

MoonInfo.controller('WeekController',['$scope',function($scope){
  $scope.loadWeek = function(){
    $scope.days = curWeek;
  };
  $scope.loadWeek();
}]);

MoonInfo.controller('DayController',['$scope','$http','$stateParams','$ionicLoading',function($scope,$http,$stateParams,$ionicLoading){
  $ionicLoading.show();
  $http.get("http://api.burningsoul.in/moon/" + [$stateParams.timeStamp])
    .success(function(response){
      $scope.day = timeConverter([$stateParams.timeStamp]);
      $scope.age = (response.age).toFixed(2) + " days old";
      $scope.illumn = (response.illumination).toFixed(2) + "%";
      $scope.stage = ucFirst(response.stage);
      $scope.core = response.DFCOE.toFixed(0) + " km";
      $scope.sun = response.DFS.toFixed(0) + " km";
      if(response.illumination < 50 && response.stage == "waxing"){
        $scope.moon = "wax_crescent.png";
      }else if(response.illumination > 50 && response.stage == "waxing"){
        $scope.moon = "wax_gibbous.png";
      }else if(response.illumination < 50 && response.stage == "waning"){
        $scope.moon = "wan_crescent.png";
      }else if(response.illumination > 50 && response.stage == "waning"){
        $scope.moon = "wan_gibbous.png";
      }
      $ionicLoading.hide();
    });
}]);
