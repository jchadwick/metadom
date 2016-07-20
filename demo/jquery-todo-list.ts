import $ from 'jquery'
import JQueryComponent from '../src/JQueryComponent'
import {IAttributeChange} from '../src/metadom'
import { Todos } from './todosService'

function renderTodo(todo, selected) {
    if(!todo) return null;

    return `
        <li todo-id="${todo.id}" class="todo">
            ${todo.id} -
            ${todo.name}
            ${selected ? `<span>(Selected)</span>` : ``}
        </li>
    `
}

function render(el: HTMLElement) {
    let $el = $(el),
        selectedTodoId = $(el).attr('selected-todo-id');

    let todoEls = Todos.filter(x => !!x).map(todo => 
        renderTodo(todo, todo.id == selectedTodoId)
    );

    $el.html(['<ul>', ...todoEls, '</ul>'].join(''))
        .on('click', function(evt) {
            let todoId = evt.target.attributes['todo-id'].value;
            el.dispatch('on-selected-todo-changed', { todoId });
        })
}

function onChange(el: HTMLElement, change?: IAttributeChange) {

    if(change.attr == 'selected-todo-id') {
        let oldTodo = Todos.find(x => x.id == change.oldValue),
            newTodo = Todos.find(x => x.id == change.newValue);

        $(el).find(`[todo-id=${change.oldValue}]`).replaceWith(renderTodo(oldTodo, false))
        $(el).find(`[todo-id=${change.newValue}]`).replaceWith(renderTodo(newTodo, true))
    }

}

JQueryComponent.webComponent('jqueryTodoList',
    function jQueryTodoList(change?: IAttributeChange) {
        if(change) onChange(this, change);
        else render(this);
    }
)