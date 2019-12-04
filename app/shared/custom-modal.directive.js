'use strict';
angular.module('myApp.modal', []).directive('customModal', customModal);

function customModal() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'shared/custom-modal.html',
    transclude: true,
    replace: true,
    scope: true,
    link: linkFunc,
    controller: ModalController,
    controllerAs: 'vm',
    bindToController: true
  };

  function linkFunc(scope, el, attr, ctrl) {
    scope.$watch(attr.visible, function(value) {
      if (value === true) {
        $(el).modal('show');
      } else {
        $(el).modal('hide');
      }
    });
    $(el).on('shown.bs.modal', function() {
      scope.$apply(function() {
        scope.$parent.ac.isOpen = true;
      });
    });

    $(el).on('hidden.bs.modal', function() {
      scope.$apply(function() {
        scope.$parent.ac.isOpen = false;
      });
    });
  }

  ModalController.$inject = ['$scope'];

  function ModalController($scope) {
    var vm = this;
    vm.$onInit = onInit;

    function onInit() {}
  }

  return directive;
}
