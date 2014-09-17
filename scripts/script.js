angular.module('timestamper', ['firebase'])

.controller('appController', ['$scope', '$firebase', '$filter', '$log', function($scope, $firebase, $filter, $log) {
	var ref = new Firebase('https://gap-timestamper.firebaseio.com');
	var sync = $firebase(ref);

	var timestamps = sync.$asArray();
	$scope.timestamps = timestamps;

	$scope.numInLine = 0;
	$scope.numAssociates = 0;

	$scope.enterStore = function() {
		var timestamp = $filter('date')(new Date(), 'medium');
		$log.log("Enter store @ " + timestamp);
		timestamps.$add({enterStore: timestamp});
	};

	$scope.exitStore = function() {
		var timestamp = $filter('date')(new Date(), 'medium');
		$log.log("Exit store @ " + timestamp);
		timestamps.$add({exitStore: timestamp});
	};

	$scope.enterLine = function() {
		var timestamp = $filter('date')(new Date(), 'medium');
		$log.log("Enter line @ " + timestamp);
		timestamps.$add({enterLine: timestamp});
		$scope.numInLine++;
	};

	$scope.exitLine = function() {
		var timestamp = $filter('date')(new Date(), 'medium');
		$log.log("Exit line @ " + timestamp);
		timestamps.$add({exitLine: timestamp});
		$scope.numInLine--;
	};

	$scope.abandonLine = function() {
		var timestamp = $filter('date')(new Date(), 'medium');
		$log.log("Abandon line @ " + timestamp);
		timestamps.$add({abandonLine: timestamp});
	};

	$scope.addAssociate = function() {
		var timestamp = $filter('date')(new Date(), 'medium');
		$log.log("Add associate @ " + timestamp);
		timestamps.$add({addAssociate: timestamp});
		$scope.numAssociates++;
	};

	$scope.removeAssociate = function() {
		var timestamp = $filter('date')(new Date(), 'medium');
		$log.log("Remove associate @ " + timestamp);
		timestamps.$add({removeAssociate: timestamp});
		$scope.numAssociates--;
	};

	$scope.undo = function() {
		timestamps.$remove(timestamps.length - 1);
	};

	$scope.clearAll = function() {
		for (var i = 0; i < timestamps.length; i++) {
			timestamps.$remove(i);
		}
	};
}]);