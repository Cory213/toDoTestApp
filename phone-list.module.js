'use strict';

// Define the `phoneList` module
angular.module('phoneList', [])
// Filter to make space between entries and delete buttons uniform.
.filter('format', function() {
    return function(input) {
      var formatted = "";
      var emptySpace = 25 - input.length;
      for(var i = 0; i < emptySpace; i++) {
        formatted += " ";
      }
      return formatted;
    };
  })
  .controller('studentController', function ($scope, $q, $timeout) {
    $scope.entryField = "Test"
    $scope.statusMessage = "Nothing going on right now!"
    $scope.isDisabled = false;
    
    $scope.toDoList = [
        {
          entry: "sit"
        }, {
          entry: "run"
        }, {
          entry: "walk"
        }
    ];

    $scope.addEntry = function (status) {
      $scope.isDisabled = true;
      var choice = false;
      if(status === 1) {
        choice = true;
      }
      var promise = asyncAdd(choice, $scope.entryField);
      
      promise.then(function(newList) {
         $scope.toDoList.push({entry: newList[Object.keys(newList).length - 1].entry});
         $scope.isDisabled = false;
         $scope.statusMessage = "Successfully added an entry!";
         console.log($scope.toDoList)
      }, function(failText) {
        $scope.isDisabled = false;
        $scope.statusMessage = failText;
      });
    }

    $scope.removeEntry = function (status, index) {
      $scope.isDisabled = true;
      var choice = false;
      if(status === 1) {
        choice = true;
      }
      var promise = asyncRemove(choice, index);
      
      promise.then(function(newList) {
         $scope.toDoList = newList;
         $scope.isDisabled = false;
         $scope.statusMessage = "Successfully removed an entry!";
         console.log($scope.toDoList)
      }, function(failText) {
        $scope.isDisabled = false;
        $scope.statusMessage = failText;
      });
    }

    // True/False will force a resolved/rejected function.
    function promiseChoice(result) {
        if(result === true) {
            return true;
        } else {
            return false;
        }
    }

    function asyncAdd(result, input) {
        var deferred = $q.defer();
        $scope.statusMessage = "Attempting to add an entry."
      
        setTimeout(function() {
             if (promiseChoice(result)) {
                var newList = angular.copy($scope.toDoList, []);
                newList.push({entry: input});
                deferred.resolve(newList);
            } else {
                deferred.reject("Failed to add entry!");
            }
        }, 3000);
      
        return deferred.promise;
      }

      function asyncRemove(result, index) {
        var deferred = $q.defer();
        $scope.statusMessage = "Attempting to remove an entry."
      
        setTimeout(function() {
             if (promiseChoice(result)) {
                var newList = angular.copy($scope.toDoList, []);
                newList.splice(index, 1);
                deferred.resolve(newList);
            } else {
                deferred.reject("Failed to remove entry!");
            }
        }, 3000);
      
        return deferred.promise;
      }
});