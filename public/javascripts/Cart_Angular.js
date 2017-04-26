//var temp = [];

var app = angular.module("orders", ["ngResource"]);
app.controller("shoppingcart", function ($scope, $resource,$http) {
    $scope.items = [];
    var r = $resource("/menu/drinks");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });

    var r = $resource("/menu/appetizer");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });
    var r = $resource("/menu/entrees");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });

    var r = $resource("/menu/desserts");

    r.query(function (foodTypes) {
        $scope.FoodTypes = foodTypes;
    });

    $scope.addToCart = function (item) {
        
        var obj = {
            name: item.name,
            description: item.description,
            price: item.price
        }
        $scope.items.push(obj);
    }

    $scope.checkOut = function () {
        var obj = { items: $scope.items }
        response = { popup: "Sent to server." }
        $http.post("/orders/newOrder", obj).then(function (response) {
            if (response.popup) { $scope.message = response.popup }

        });
       
    }
        

});
