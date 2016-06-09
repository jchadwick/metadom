System.register(['/src/metadom', './angular-todo-list'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var appEl, angularTodoList, jqueryTodoList, selectedTodoId;
    function onSelectedTodoChanged(todoId) {
        console.debug('onSelectedTodoChanged', todoId);
        selectedTodoId = todoId;
        sync();
    }
    function sync() {
        angularTodoList.setAttribute('selected-todo-id', selectedTodoId.toString());
        jqueryTodoList.setAttribute('selected-todo-id', selectedTodoId.toString());
    }
    return {
        setters:[
            function (_1) {},
            function (_2) {}],
        execute: function() {
            //import 'jquery-todo-list' 
            appEl = document.createElement('div');
            appEl.innerHTML = "\n    <h1>Component Demo</h1>\n    <angular-todo-list selected-todo-id=\"1\"></angular-todo-list>\n    <jquery-todo-list></jquery-todo-list>\n";
            document.body.appendChild(appEl);
            angularTodoList = appEl.getElementsByTagName('angular-todo-list')[0], jqueryTodoList = appEl.getElementsByTagName('jquery-todo-list')[0];
            selectedTodoId = 2;
            angularTodoList.addEventListener('on-selected-todo-changed', onSelectedTodoChanged);
            jqueryTodoList.addEventListener('on-selected-todo-changed', onSelectedTodoChanged);
        }
    }
});
