'use strict';
angular
  .module('myApp.accountDetail', ['ngRoute'])
  .controller('AccountDetailController', AccountDetailController);

AccountDetailController.$inject = [
  '$scope',
  '$routeParams',
  '$location',
  'dataService'
];

function AccountDetailController($scope, $routeParams, $location, dataService) {
  var vm = this;
  vm.account = JSON.parse($routeParams.account);
  vm.isOpen = false;
  vm.monney = 0;
  vm.checkBalance = checkBalance;
  vm.editAccount = editAccount;
  vm.modalEditAccount = modalEditAccount;
  vm.deleteAccount = deleteAccount;
  vm.modalDeposit = modalDeposit;
  vm.modalExtraction = modalExtraction;
  vm.saveTransactionAccount = saveTransactionAccount;

  function checkBalance() {
    $('.toast').toast('show');
  }
  function modalEditAccount() {
    vm.modalLabel = 'Edit Account';
    vm.modalType = 'edit';
    vm.isOpen = true;
  }
  function editAccount() {
    dataService.updateAccount(vm.account).then(function(resp) {
      console.log(resp);
    });
  }

  function deleteAccount() {
    dataService.deleteAccount(vm.account.id).then(function(resp) {
      $location.path('/');
    });
  }

  function modalDeposit() {
    vm.monney = 0;
    vm.modalLabel =
      'Su saldo es: $' + vm.account.monney + ', Cuanto desea depositar?';
    vm.modalType = 'transaction';
    vm.modalEventType = 'deposit';
    vm.isOpen = true;
  }

  function modalExtraction() {
    vm.monney = 0;
    vm.modalLabel =
      'Su saldo es: $' + vm.account.monney + ', Cuanto desea retirar?';
    vm.modalType = 'transaction';
    vm.modalEventType = 'extraction';
    vm.isOpen = true;
  }

  function saveTransactionAccount(value) {
    if (vm.monney > 0) {
      switch (value) {
        case 'extraction':
          var total = vm.account.monney - vm.monney;
          if (total < 0) {
            alert('Fondos insuficientes');
          } else {
            vm.account.monney = total;
            var history = {
              movement: 'Extracción',
              monney: vm.monney
            };
            vm.account.history.push(history);
          }
          editAccount();
          break;
        case 'deposit':
          var total = vm.account.monney + vm.monney;
          vm.account.monney = total;
          var history = {
            movement: 'Depósito',
            monney: vm.monney
          };
          vm.account.history.push(history);
          editAccount();
          break;
        default:
          break;
      }
    } else {
      alert('Ingrese un valor válido');
    }
  }
}
