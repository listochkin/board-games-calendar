define(function (require) {
    'use strict';

    var typeAheadTemplate = require('text!./type-ahead.tpl.html'),
        controller = require('../controllers/type-ahead.controller');

    TypeAheadDirective.$inject = [];
    return TypeAheadDirective;

    function TypeAheadDirective() {
        return {
            replace: true,
            restrict: 'A',
            template: typeAheadTemplate,
            controller: controller,
            controllerAs: 'dgTypeAheadIns',
            bindToController: true,
            scope: {
                ngModel: '='
            }
        };
    }
});
