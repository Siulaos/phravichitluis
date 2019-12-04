'use strict';
angular
  .module('myApp.account', ['ngRoute', 'ngResource'])
  .controller('AccountController', AccountController);

AccountController.$inject = ['$scope', '$location', 'dataService'];

function AccountController($scope, $location, dataService) {
  var vm = this;
  vm.listAccount = 'Client List';
  vm.account = { name: '', monney: 500, history: [] };
  vm.isOpen = false;
  //Functions
  vm.addAccount = addAccount;
  vm.selectAccount = selectAccount;
  vm.openAddAccountModal = openAddAccountModal;
  vm.getAccounts = getAccounts;
  //Obtengo las cuentas nuevamente
  getAccounts();

  function openAddAccountModal() {
    vm.modalLabel = 'Add Account';
    vm.modalType = 'add';
    vm.isOpen = true;
    vm.account = {};
  }

  function addAccount() {
    vm.isOpen = false;
    var validName = true;
    if (vm.account.name) {
      var account = {
        name: vm.account.name,
        monney: 500,
        history: [
          {
            movement: 'Saldo Inicial',
            monney: 500
          }
        ]
      };
      vm.accounts.forEach(a => {
        if (a.name === vm.account.name) {
          validName = false;
        }
      });
      if (validName) {
        //service push
        dataService.saveNewAccount(account).then(function(resp) {
          getAccounts();
        });
      } else {
        alert('Ya existe un cliente con el mismo nombre.');
      }
    }
  }

  function selectAccount(value) {
    //Rutearlo con parametros
    var account = JSON.stringify(value);
    $location.path('/account-detail/' + account);
  }

  function getAccounts() {
    dataService.getAccounts().then(function(resp) {
      if (resp.data.length > 0) {
        vm.accounts = [];
        resp.data.forEach(a => {
          a.account.id = a.id;
          vm.accounts.push(a.account);
        });
      } else {
        vm.accounts = [];
      }
    });
  }
}
