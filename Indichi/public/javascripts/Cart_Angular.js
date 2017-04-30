var app = angular.module("orders", ["ngResource","LocalStorageModule"]);
app.controller("shoppingcart", function ($scope, $resource, $http, localStorageService) {
    $scope.items = [];
    $scope.itemQuantity = 0;
    var items = [];
    var total = 0;
    $scope.checkoutDisabled = false;
    $scope.items2 = localStorageService.get("cart");
    if($scope.items2 != null) {
        for (var i = 0; i < $scope.items2.length; i++) {
        var priceString = $scope.items2[i].price.substring(1);
        total += parseFloat(priceString) * parseInt($scope.items2[i].quantity);
    }
    }
    $scope.total = total;
    console.log(localStorageService.get("cart"));
    console.log($scope.items);
    console.log($scope.total);

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
        console.log("Quantity: " + item.quantity);
        $scope.checkoutDisabled = false;
        var obj = {
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }
        $scope.items.push(obj);
        if (localStorageService.get("cart")) {
            items = localStorageService.get("cart");
            items.push(obj);
            //localStorageService.clearAll();
            //for (var i = 0; i < $scope.items.length; i++) {
            //    items.push($scope.items[i]);
            //}
        }
        else {
            items = $scope.items;
            localStorageService.clearAll();
        }
        localStorageService.set("cart", items);
        
    }

    $scope.checkOut = function () {
        $scope.items = localStorageService.get("cart");
        localStorageService.clearAll();
        var obj = { items: $scope.items }
        response = { popup: "Sent to server." }
        $http.post("/orders/newOrder", obj).then(function (response) {
            if (response.popup) { $scope.message = response.popup }
            alert("Order Submitted successfully");
            $scope.items = [];
            $scope.checkoutDisabled = true;
        });
       
    }   

})
