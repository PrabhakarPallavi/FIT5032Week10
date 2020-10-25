// Defining angularjs module
var app = angular.module('demoModule', []);
// Defining angularjs Controller and injecting ProductsService
app.controller('demoCtrl', function ($scope, $http, UnitService) {
    $scope.unitData = null;
    // Fetching records from the factory created at the bottom of the script file
    UnitService.GetAllRecords().then(function (d) {
        $scope.unitData = d.data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.Unit = {
        Id: '',
        UnitCode: '',
        UnitName: ''
    };
    // Reset product details
    $scope.clear = function () {
        $scope.Unit.Id = '';
        $scope.Unit.UnitCode = '';
        $scope.Unit.UnitName = '';
    }
    //Add New Item
    $scope.save = function () {
        if ($scope.Unit.UnitCode != "" &&
            $scope.Unit.UnitName != "") {
            $http({
                method: 'POST',
                url: 'api/Unit/PostUnit/',
                data: $scope.Unit
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.unitData.push(response.data);
                $scope.clear();
                alert("Unit Added Successfully !!!");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };
    // Edit product details
    $scope.edit = function (data) {
        $scope.Unit = { Id: data.Id, UnitCode: data.UnitCode, UnitName: data.UnitName };
    }
    // Cancel product details
    $scope.cancel = function () {
        $scope.clear();
    }
    // Update product details
    $scope.update = function () {
        if ($scope.Unit.UnitCode != "" &&
            $scope.Unit.UnitName != "") {
            $http({
                method: 'PUT',
                url: 'api/Unit/PutUnit/' + $scope.Unit.Id,
                data: $scope.Unit
            }).then(function successCallback(response) {
                $scope.unitData = response.data;
                $scope.clear();
                alert("Unit Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };
    // Delete product details
    $scope.delete = function (index) {
        $http({
            method: 'DELETE',
            url: 'api/Unit/DeleteUnit/' + $scope.unitData[index].Id,
        }).then(function successCallback(response) {
            $scope.unitData.splice(index, 1);
            alert("Unit Deleted Successfully !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };
});
// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.
app.factory('UnitService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('api/Unit/GetAllUnits');
    }
    return fac;
});