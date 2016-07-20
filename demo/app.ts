import '/src/metadom'
import './angular-todo-list'
import './jquery-todo-list' 

console.info('Loading application...')

const appEl = document.createElement('div');
appEl.innerHTML = `
    <h1>Cross-Framework Component Demo</h1>

    <label for="selectedId">Selected Todo</label>
    <select id="selectedId">
        <option>1</option>
        <option>2</option>
        <option>3</option>
    </select>

    <h2>Angular Todo List</h2>
    <angular-todo-list></angular-todo-list>

    <h2>jQuery Todo List</h2>
    <jquery-todo-list></jquery-todo-list>
`
document.body.appendChild(appEl);


const idSelector = document.getElementById('selectedId'),
      angularTodoList = appEl.getElementsByTagName('angular-todo-list')[0],
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

idSelector.addEventListener('change', function() { setSelectedTodoId(idSelector.value) })
angularTodoList.addEventListener('on-selected-todo-changed', onSelectedTodoChanged)
jqueryTodoList.addEventListener('on-selected-todo-changed', onSelectedTodoChanged)

setSelectedTodoId(1)