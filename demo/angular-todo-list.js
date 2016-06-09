System.register(['angular', '../src/AngularComponent'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular, AngularComponent_1;
    var directive, AngularTodoList;
    return {
        setters:[
            function (angular_1) {
                angular = angular_1;
            },
            function (AngularComponent_1_1) {
                AngularComponent_1 = AngularComponent_1_1;
            }],
        execute: function() {
            directive = angular.module('angular-todo-list', [])
                .component('angularTodoList', {
                bindings: {
                    selectedTodoId: '<',
                    onSelectedTodoChanged: '&'
                },
                template: 'selectedTodoId = {{::$ctrl.selectedTodoId}}'
            });
            AngularTodoList = Object.create(AngularComponent_1.default, {
                name: { value: directive.name }
            });
            exports_1("default",document.registerElement('angular-todo-list', { prototype: AngularTodoList }));
        }
    }
});
