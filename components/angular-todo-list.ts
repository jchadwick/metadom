import * as angular from 'angular'
import AngularComponent from '../src/AngularComponent' 

const module = angular.module('angular-todo-list', [])
    .component('angularTodoList', {
        bindings: {
            selectedTodoId: '<',
            onSelectedTodoChanged: '&'
        },
        template: `
            <ul>
                <li ng-repeat="todo in $ctrl.todos" ng-click="$ctrl.onSelectedTodoChanged({ todoId: todo.id })">
                    {{todo.id}} -
                    {{todo.name}}
                    <span ng-if="todo.id == $ctrl.selectedTodoId">(Selected)</span> 
                </li>
            </ul>
        `
    })

AngularComponent.webComponent(
    { module: module.name, name: 'angularTodoList', events: ['onSelectedTodoChanged']}
)