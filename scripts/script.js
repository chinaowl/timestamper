(function() {
	var app = angular.module('timestamper', ['firebase']);

	app.controller('AppController', ['$scope', '$firebase', '$filter', '$log', function($scope, $firebase, $filter, $log) {
		var ref = new Firebase('https://gap-timestamper.firebaseio.com');
		var sync = $firebase(ref);

		var timestamps = sync.$asArray();
		$scope.timestamps = timestamps;

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
		};

		this.exitLine = function() {
			var timestamp = $filter('date')(new Date(), 'medium');
			$log.log("Exit line @ " + timestamp);
			timestamps.$add({exitLine: timestamp});
		};

		this.clearAll = function() {
			for (var i = 0; i < timestamps.length; i++) {
				timestamps.$remove(i);
			}
		};
	}]);
})();