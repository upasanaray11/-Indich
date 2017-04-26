var module = angular.module('Menu', ["ngResource"]);

module.controller("menuController", function ($scope, $resource) {
    var r = $resource("/menu");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });
});


