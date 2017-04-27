var module = angular.module('Admin', ["ngResource"]);

module.controller("adminController", function ($scope, $resource) {
        var r = $resource("/admin");
        r.query(function (getlistUsers) {
            $scope.GetlistUsers = getlistUsers;
    });
});



