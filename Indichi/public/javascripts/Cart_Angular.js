var app = angular.module("orders", ["ngResource","LocalStorageModule"]);
app.controller("shoppingcart", function ($scope, $resource, $http, localStorageService) {
    $scope.items = [];
    var items = [];

    console.log(localStorageService.get("cart"));
    console.log($scope.items);

    var r = $resource("/menu");

    r.query(function (foodTypes) {
        $scope.menuFoodTypes = foodTypes;
    });

    var r = $resource("/menu/drinks");

    r.query(function (foodTypes) {
        $scope.drinksFoodTypes = foodTypes;
    });

    var r = $resource("/menu/appetizer");

    r.query(function (foodTypes) {
        $scope.appetizerFoodTypes = foodTypes;
    });
    var r = $resource("/menu/entrees");

    r.query(function (foodTypes) {
        $scope.entreesFoodTypes = foodTypes;
    });

    var r = $resource("/menu/desserts");

    r.query(function (foodTypes) {
        $scope.dessertsFoodTypes = foodTypes;
    });

    $scope.addToCart = function (item) {
        
        var obj = {
            name: item.name,
            description: item.description,
            price: item.price
        }
        $scope.items.push(obj);
        if (localStorageService.get("cart")) {
            items = localStorageService.get("cart");
            localStorageService.clearAll();
            for (var i = 0; i < $scope.items.length; i++) {
                items.push($scope.items[i]);
            }
        }
        else {
           items =  $scope.items;
        }
        localStorageService.set("cart",items);
    }

    $scope.checkOut = function () {
        $scope.items = localStorageService.get("cart");
        localStorageService.clearAll();
        var obj = { items: $scope.items }
        response = { popup: "Sent to server." }
        $http.post("/orders/newOrder", obj).then(function (response) {
            if (response.popup) { $scope.message = response.popup }

        });
       
    }   

})
