var angular = require('angular');

angular.module('myApp', [])
    .controller('HomeCtrl', function($scope, $http) {

        $scope.info = {};

        $scope.showAdd = true;
    
        $scope.showAddPopUp = function(){
            $scope.showAdd = true;
            $scope.info = {};
            
            $('#addPopUp').modal('show');
        };
				

        $scope.addMachine = function() {

            $http({
                method: 'POST',
                url: '/addMachine',
                data: {
                    info: $scope.info
                }
            }).then(function(response) {
                $scope.showlist();
                $('#addPopUp').modal('hide');
                $scope.info = {};
            }, function(error) {
                console.log(error);
            });
        };
    
        $scope.showlist = function() {
            $http({
                method: 'POST',
                url: '/getMachineList',

            }).then(function(response) {
                $scope.machines = response.data;
                console.log('mm', $scope.machines);
            }, function(error) {
                console.log(error);
            });
        };
        
        $scope.showlist();

});