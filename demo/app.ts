import '/src/metadom'
import './angular-todo-list'
//import 'jquery-todo-list' 



const appEl = document.createElement('div');
appEl.innerHTML = `
    <h1>Component Demo</h1>
    <select id="selectedId">
        <option>1</option>
        <option>2</option>
        <option>3</option>
    </select>
    <angular-todo-list selected-todo-id="1"></angular-todo-list>
    <jquery-todo-list></jquery-todo-list>
`
document.body.appendChild(appEl);


const angularTodoList = appEl.getElementsByTagName('angular-todo-list')[0],
      jqueryTodoList = appEl.getElementsByTagName('jquery-todo-list')[0];

let selectedTodoId = 2;

function onSelectedTodoChanged(evnt: CustomEvent) {
    setSelectedTodoId(evnt.detail.todoId);
}

function setSelectedTodoId(todoId) {
    selectedTodoId = todoId;
    console.debug('setSelectedTodoId', todoId)
    sync();
}

function sync() {
    idSelector.value = selectedTodoId;
    angularTodoList.setAttribute('selected-todo-id', selectedTodoId.toString())
    jqueryTodoList.setAttribute('selected-todo-id', selectedTodoId.toString())
}

var idSelector = document.getElementById('selectedId');
idSelector.addEventListener('change', function() { setSelectedTodoId(idSelector.value) })


angularTodoList.addEventListener('on-selected-todo-changed', onSelectedTodoChanged)
jqueryTodoList.addEventListener('on-selected-todo-changed', onSelectedTodoChanged)