import * as angular from 'angular'
import AngularComponent from '../src/AngularComponent' 

const directive = angular.module('angular-todo-list', [])
    .component('angularTodoList', {
        bindings: {
            selectedTodoId: '<',
            onSelectedTodoChanged: '&'
        },
        template: 'selectedTodoId = {{::$ctrl.selectedTodoId}}'
    })

let AngularTodoList = Object.create(AngularComponent, {
    name: { value: directive.name }
});

export default document.registerElement('angular-todo-list', { prototype: AngularTodoList })