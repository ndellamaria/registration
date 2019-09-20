const moment = require("moment");

angular.module("reg").controller("AdminStatsCtrl", [
  "$scope",
  "UserService",
  function($scope, UserService) {
    UserService.getStats().then(function(response) {
      $scope.stats = response.data;
      $scope.loading = false;
    });

    $scope.fromNow = function(date) {
      return moment(date).fromNow();
    };
  }
]);
