import '/src/metadom'
import './angular-todo-list' 
//import 'jquery-todo-list' 


const appEl = document.createElement('div');
appEl.innerHTML = `
    <h1>Component Demo</h1>
    <angular-todo-list selected-todo-id="1"></angular-todo-list>
    <jquery-todo-list></jquery-todo-list>
`
document.body.appendChild(appEl);


const angularTodoList = appEl.getElementsByTagName('angular-todo-list')[0],
      jqueryTodoList = appEl.getElementsByTagName('jquery-todo-list')[0];

let selectedTodoId = 2;

function onSelectedTodoChanged(todoId) {
    console.debug('onSelectedTodoChanged', todoId)
    selectedTodoId = todoId;
    sync();
}

function sync() {
    angularTodoList.setAttribute('selected-todo-id', selectedTodoId.toString())
    jqueryTodoList.setAttribute('selected-todo-id', selectedTodoId.toString())
}

angularTodoList.addEventListener('on-selected-todo-changed', onSelectedTodoChanged)
jqueryTodoList.addEventListener('on-selected-todo-changed', onSelectedTodoChanged)