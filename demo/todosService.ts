interface Todo {
    id: string;
    name: string;
    completed: boolean;
}

export let Todos: Todo[] = [
    { id: "1", name: 'Pick up drycleaning', completed: false },
    { id: "2", name: 'Save Gotham', completed: false },
    { id: "3", name: 'Clean cave', completed: true },
];

let __id = 0;

class TodosService {

    private _todos: Todo[];

    constructor(todos?: Todo[]) {
        this._todos = [].concat(todos);
    }

    addTodo(todo: Todo): Todo {
        todo.id = (__id += 1).toString();
        this._todos.push(todo);
        return todo;
    }

    getTodoById(id: string): Todo {
        let matches = this._todos.filter(x => x.id == id),
            todo = matches.length ? matches[0] : null;

        return clone(todo); 
    }

    getTodos(): Todo[] {
        return clone(this._todos); 
    }

}

function clone<T>(src: T): T {
    return JSON.parse(JSON.stringify(src));
}