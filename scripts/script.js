(function() {
	var app = angular.module('timestamper', ['firebase']);

	app.controller('AppController', ['$scope', '$firebase', '$filter', '$log', function($scope, $firebase, $filter, $log) {
		var ref = new Firebase('https://gap-timestamper.firebaseio.com');
		var sync = $firebase(ref);

		var timestamps = sync.$asArray();
		$scope.timestamps = timestamps;

		$scope.numInLine = 0;
		$scope.numAssociates = 0;

		this.enterStore = function() {
			var timestamp = $filter('date')(new Date(), 'medium');
			$log.log("Enter store @ " + timestamp);
			timestamps.$add({enterStore: timestamp});
		};

		this.exitStore = function() {
			var timestamp = $filter('date')(new Date(), 'medium');
			$log.log("Exit store @ " + timestamp);
			timestamps.$add({exitStore: timestamp});
		};

		this.enterLine = function() {
			var timestamp = $filter('date')(new Date(), 'medium');
			$log.log("Enter line @ " + timestamp);
			timestamps.$add({enterLine: timestamp});
			$scope.numInLine++;
		};

		this.exitLine = function() {
			var timestamp = $filter('date')(new Date(), 'medium');
			$log.log("Exit line @ " + timestamp);
			timestamps.$add({exitLine: timestamp});
			$scope.numInLine--;
		};

		this.abandonLine = function() {
			var timestamp = $filter('date')(new Date(), 'medium');
			$log.log("Abandon line @ " + timestamp);
			timestamps.$add({abandonLine: timestamp});
		};

		this.addAssociate = function() {
			var timestamp = $filter('date')(new Date(), 'medium');
			$log.log("Add associate @ " + timestamp);
			timestamps.$add({addAssociate: timestamp});
			$scope.numAssociates++;
		};

		this.removeAssociate = function() {
			var timestamp = $filter('date')(new Date(), 'medium');
			$log.log("Remove associate @ " + timestamp);
			timestamps.$add({removeAssociate: timestamp});
			$scope.numAssociates--;
		};

		this.undo = function() {
			timestamps.$remove(timestamps.length - 1);
		};

		this.clearAll = function() {
			for (var i = 0; i < timestamps.length; i++) {
				timestamps.$remove(i);
			}
		};
	}]);
})();