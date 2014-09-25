angular.module('timestamper', ['firebase'])

.controller('appController', ['$scope', '$firebase', '$filter', function ($scope, $firebase, $filter) {
	var ref = new Firebase('https://gap-timestamper.firebaseio.com');
	var sync = $firebase(ref);

	var timestamps = sync.$asArray();
	$scope.timestamps = timestamps;

	$scope.initialCount = {
		numInStore : 0,
		numAssociates : 0
	};

	$scope.numInLine = 0;
	$scope.numAssociates = 0;

	$scope.saveInitialCount = function () {
		var timestamp = Date.now();
		var dataToAdd = {};
		dataToAdd.timestamp = timestamp;
		dataToAdd.initialNumberInStore = $scope.initialCount.numInStore;
		dataToAdd.initialNumberAssociates = $scope.initialCount.numAssociates;
		timestamps.$add(dataToAdd);
		alert("Saved successfully!");
	};

	var recordTimestamp = function (type) {
		var timestamp = Date.now();
		var dataToAdd = {};
		dataToAdd[type] = timestamp;
		timestamps.$add(dataToAdd);
		console.log(type + ',' + timestamp);
	};

	$scope.enterStore = function () {
		recordTimestamp('Enter Store');
	};

	$scope.exitStore = function () {
		recordTimestamp('Exit Store');
	};

	$scope.enterLine = function () {
		recordTimestamp('Enter Line');
		$scope.numInLine++;
	};

	$scope.exitLine = function () {
		recordTimestamp('Exit Line');
		$scope.numInLine--;
	};

	$scope.abandonLine = function () {
		recordTimestamp('Abandon Line');
		$scope.numInLine--;
	};

	$scope.addAssociate = function () {
		recordTimestamp('Add Associate');
		$scope.numAssociates++;
	};

	$scope.removeAssociate = function () {
		recordTimestamp('Remove Associate');
		$scope.numAssociates--;
	};

	$scope.undo = function () {
		timestamps.$remove(timestamps.length - 1);
	};

	$scope.clearAll = function () {
		for (var i = 0; i < timestamps.length; i++) {
			timestamps.$remove(i);
		}
	};

	$scope.downloadData = function() {
		// ref.on('value', function (snapshot) {
		// 	var data = snapshot.val();
		// 	var dataString = '';
		// 	for (var key in data) {
		// 		var typeAndTimestamp = data[key];
		// 		var type = Object.keys(typeAndTimestamp)[0];
		// 		dataString += type + ',' + typeAndTimestamp[type] + '\n';
		// 	}
		// 	console.save(dataString, 'timestamps.txt');
		// }, function (errorObject) {
		// 	console.log('The read failed: ' + errorObject.code);
		// });
		ref.on('value', function (snapshot) {
			var data = snapshot.val();
			var dataString = '[';
			for (var key in data) {
				var dataObject = data[key];
				dataString += '{';
				for (var i = 0; i < Object.keys(dataObject).length; i++) {
					var aKey = Object.keys(dataObject)[i];
					dataString += '"' + aKey + '":' + dataObject[aKey] + ',';
				}
				dataString = dataString.substring(0, dataString.length - 1);
				dataString += '},\n';
			}
			dataString = dataString.substring(0, dataString.length - 2);
			dataString += ']';
			console.save(dataString, 'timestamps.txt');
		}, function (errorObject) {
			console.log('The read failed: ' + errorObject.code);
		});
	};
}]);

/* Source: http://bgrins.github.io/devtools-snippets/#console-save */
(function (console) {

    console.save = function (data, filename) {

        if (!data) {
            console.error('Console.save: No data');
            return;
        }

        if (!filename) filename = 'console.json';

        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4);
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a');

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    };
})(console);