'use strict';
angular
  .module('myApp.account-service', ['ngRoute', 'ngResource'])
  .factory('dataService', dataService);

dataService.$inject = ['$http', '$resource'];
function dataService($http, $resource) {
  return {
    getAccounts: getAccounts,
    saveNewAccount: saveNewAccount,
    deleteAccount: deleteAccount,
    updateAccount: updateAccount
  };

  function getAccounts() {
    return $http({
      url: 'http://localhost:3000/account',
      method: 'GET'
    });
  }

  function saveNewAccount(account) {
    return $http({
      url: 'http://localhost:3000/account',
      method: 'POST',
      data: { account: account }
    });
  }

  function updateAccount(account) {
    return $http({
      url: 'http://localhost:3000/account/' + account.id,
      method: 'PUT',
      data: {
        account: {
          name: account.name,
          monney: account.monney,
          history: account.history
        }
      }
    });
  }

  function deleteAccount(id) {
    return $http({
      url: 'http://localhost:3000/account/' + id,
      method: 'DELETE'
    });
  }
}
