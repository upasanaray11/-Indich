var module = angular.module('Menu', ["ngResource"]);

module.controller("menuController", function ($scope, $resource) {
    var r = $resource("/menu");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });

    //$scope.categoryTest = function (category) {

    //    var categorYname = category.toLowerCase();
    //    var r = $resource("/menu/" + categorYname);

    //    r.query(function (foodTypes) {
    //        $scope.FoodTypes = foodTypes;
    //    });


    //};
});


module.controller("drinksController", function ($scope, $resource) {
    var r = $resource("/menu/drinks");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });
});

module.controller("appetizerController", function ($scope, $resource) {
    var r = $resource("/menu/appetizer");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });
});
module.controller("entreesController", function ($scope, $resource) {
    var r = $resource("/menu/entrees");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });
});
module.controller("dessertsController", function ($scope, $resource) {
    var r = $resource("/menu/desserts");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });
});


