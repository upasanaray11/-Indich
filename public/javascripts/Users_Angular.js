var app = angular.module("Users", ["ngResource"]);
app.controller("registeringUser", function($scope, $resource){
  $scope.register = function(){
    var request = $resource("/login/registerUser");
    request.save ({
	  name: $scope.name,
	  email: $scope.email,
	  password: $scope.password,
	  uname: $scope.uname}, function(response) {
	if(response.popup){
	   $scope.message = response.popup;
	    }
    });
}});

app.controller("signinUser", function ($scope, $http, $location) {
    $scope.signin = function () {
        $http.post("/login/signin", {
            uname: $scope.uname,
            password: $scope.password
        }).then(function successCallback(response) {
            /* $scope.message = response.newUser.name + "" + response.data.popup*/
            if (response.data.isSuccessful) {
                window.location.href = '/index.html';
            }
            else { alert('Login incorrect'); }
            ;
        });
    }});
    