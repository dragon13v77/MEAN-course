// directive
//angular.module('meanhotel').directive('hotelRating', hotelRating);
//// <hotel-rating>
//
//function hotelRating() {
//	return {
//		restrict: 'E',
//		template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">&#10032;</span>',
//		bindToController: true,
//		controller: 'HotelController',
//		controllerAs: 'vm',
//		scope: {
//			stars: '@'
//		}
//	}
//}

// component
angular.module('meanhotel').component('hotelRating', {
	bindings: {
		stars: '='
	},
	template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">&#10032;</span>',
	controller: 'HotelController',
	controllerAs: 'vm'
});