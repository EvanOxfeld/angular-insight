angular.module('selekt', ['ngSanitize', 'ui.highlight', 'ui.bootstrap'])
//todo fix group references
.controller('selektController', ['$scope', function($scope) {
	$scope.state = {};

	$scope.preview = false;
	var data = $scope.selekt.data;
	$scope.assignedOptions = [];
	$scope.favoriteGroups = [data[3], data[6], data[7]];
	$scope.recentGroups = [data[1], data[2], data[8]];

	$scope.addOption = function(item) {

		if (!item.assigned) {
			item.assigned = true;
			item.selected = false;

			//this is an array
			_.each($scope.assignedOptions, function(group){ group.selected = false;});

			$scope.assignedOptions.push(item);
		}
	};

	$scope.toggleItem = function(item) {

		$scope.showMessage = false;

		if (!item.assigned) {
			item.assigned = true;
			$scope.assignedOptions.push(item);
		} else {
			$scope.removeItem(item);
		}
	};

	$scope.change = function(item){
		if(item.assigned === false) {
			$scope.showMessage = true;
			$scope.messageItem = item;
		}
	};

	$scope.selectItem = function(item){

		_.each($scope.groups, function(group){ group.selected = false;});
		item.selected = true;
	};

	$scope.inputPlaceholder = $scope.selekt.placeholderText;

	$scope.setPlaceholder = function(value){
		$scope.inputPlaceholder = value;
		if(value === 'Find assigned groups ...'){
			$scope.showOptions = false;
		}
	};


	$scope.selectAndToggle = function(item) {

		$scope.selection(item);
		$scope.toggleItem(item);
	};

	$scope.selection = function(item){

		if (item.selected) {
			$scope.currentSelection = item;
		} else {
			$scope.currentSelection = null;
		}


	};

	$scope.closeOptions = function() {
		$scope.showOptions = false;
		$scope.query = '';
		$scope.focus = false;
		_.each($scope.selekt.data, function(group){ group.selected = false;});
	};

	$scope.removeItem = function(group) {

		group.assigned = false;

		var found, index;

		found =  $scope.assignedOptions.filter(function(obj) {
			return obj._id === group._id;
		});

		index = $scope.assignedOptions.indexOf(found[0]);
		$scope.assignedOptions.splice(index,1);
	};

	//$scope.groupOptions = {};

	/*$scope.groupOptions.displayItems = [
		{id:0, field:'name', label:'name', fill:true},
		{id:1, field:'users', label:'users', type:'array-length' },
		{id:2, field:'status', label:'status' },
		{id:3, field:null, label:'tools', type:'tools', actions: [
			{label:'Edit'},
			{label: 'Delete'}
		]}
	];*/

	$scope.inputOptions = "all";

	/*$scope.groupOptions.actions = [
		{label:'Edit', callback: GroupList.get},
		{label: 'Delete', callback: GroupList.removeGroup}
	];*/
}])
.directive('selekt', function() {
	//todo design options, which are required, which have defaults
	return {
		restrict: 'A',
		templateUrl: 'select.html', //todo
		scope: {
			selekt: '='
		},
		replace: true,
		controller: 'selektController',
		compile: function() {
		}
	};
});

/*function selectController($scope, GroupList){

	// this needs integration with list directive, virtual scroll, and search







}*/
