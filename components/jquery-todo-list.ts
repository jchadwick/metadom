import $ from 'jquery'
import JQueryComponent from '../src/JQueryComponent'
import {IAttributeChange} from '../src/metadom'

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
        selectedTodoId = $(el).attr('selected-todo-id'),
        todos = el.todos || [];

    let todoEls = todos.filter(x => !!x).map(todo => 
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
        render(el)
    }

    if(change.attr == 'todos') {
        el.todos = change.newValue;
        render(el)
    }

}

JQueryComponent.webComponent('jqueryTodoList',
    function jQueryTodoList(change?: IAttributeChange) {
        if(change) onChange(this, change);
        else render(this);
    }
)