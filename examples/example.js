angular.module('example', ['selekt'])
.controller('ExampleController', function($scope, GroupList) {
	$scope.selektOptions = {
		data: GroupList.groups,
		displaySchema: [
		{id:0, field:'name', label:'name', fill:true},
		{id:1, field:'users', label:'users', type:'array-length' },
		{id:2, field:'status', label:'status' },
		{id:3, field:null, label:'tools', type:'tools', actions: [
			{label:'Edit'},
			{label: 'Delete'}
		]}],
		actions: [
			{label:'Edit', callback: GroupList.get},
			{label: 'Delete', callback: GroupList.removeGroup}
		],
		enablePreview: true,
		placeholderText: 'Find groups ...'
	};
})
.factory('GroupList', groupList);
