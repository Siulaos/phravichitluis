angular.module('myApp').config(config);

function config($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider
    .when('/', {
      templateUrl: 'account/account.html',
      controller: 'AccountController',
      controllerAs: 'vm'
    })
    .when('/account-detail/:account', {
      templateUrl: 'account-detail/account-detail.html',
      controller: 'AccountDetailController',
      controllerAs: 'vm'
    });
  $routeProvider.otherwise({ redirectTo: '/' });
}

function accountsService(dataService) {
  return dataService.getAccounts();
}
