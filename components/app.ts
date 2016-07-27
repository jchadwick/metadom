import * as metadom from '/src/metadom'
import './angular-todo-list'
import './jquery-todo-list' 

export default class App {

    static __todoId = 0;

    private selectedTodoId = 0;
    private todos = [];

    private angularTodoList: metadom.IMetadomComponent;
    private jqueryTodoList: metadom.IMetadomComponent;

    constructor(private el: HTMLElement) {
    }
    
    render() {

        let el = this.el;
        
        el.innerHTML = `
            <div class="container">
                <h1>Cross-Framework Component Demo</h1>

                <form>
                    <input type="text" placeholder="New Todo" />
                    <button type="submit" class="btn btn-primary">Add Todo</button>
                </form>

                <div class="row">
                    <div class="col-md-6">
                        <h2>Angular Todo List</h2>
                        <angular-todo-list></angular-todo-list>
                    </div>

                    <div class="col-md-6">
                        <h2>jQuery Todo List</h2>
                        <jquery-todo-list></jquery-todo-list>
                    </div>

                </div>
            </div>
        `

        this.angularTodoList = el.getElementsByTagName('angular-todo-list')[0]
        this.jqueryTodoList = el.getElementsByTagName('jquery-todo-list')[0]

        this.angularTodoList.addEventListener('on-selected-todo-changed', this.onSelectedTodoChanged.bind(this))
        this.jqueryTodoList.addEventListener('on-selected-todo-changed', this.onSelectedTodoChanged.bind(this))
        
        let todoNameEl = el.getElementsByTagName('input')[0];

        el.getElementsByTagName('form')[0].addEventListener('submit', (evt) => {
            this.addTodo(todoNameEl.value);
            todoNameEl.value = '';

            evt.preventDefault();
        })

        this.sync();
    }

    addTodo(name: string, completed?: boolean) {
        this.todos.push({ id: (App.__todoId+=1).toString(), name: name, completed: !!completed })
        this.sync();
    }

    onSelectedTodoChanged(evnt: CustomEvent) {
        this.setSelectedTodoId(evnt.detail.todoId);
    }

    setSelectedTodoId(todoId) {
        this.selectedTodoId = todoId;
        this.sync();
    }

    setData(data) {
        this.todos = data.todos;
        this.selectedTodoId = data.todoId;
        this.sync();
    }

    sync() {
        this.angularTodoList.setData({ todos: this.todos });
        this.angularTodoList.setAttribute('selected-todo-id', this.selectedTodoId.toString())
        this.jqueryTodoList.setData({ todos: this.todos });
        this.jqueryTodoList.setAttribute('selected-todo-id', this.selectedTodoId.toString())
    }

}

metadom.VanillaComponent('xApp', App)