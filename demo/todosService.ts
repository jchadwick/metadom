interface Todo {
    id: number;
    name: string;
    completed: boolean;
}

class TodosService {

    private _todos: Todo[] = [];

    getTodoById(id: number): Promise<Todo> {
        let matches = this._todos.filter(x => x.id == id),
            todo = matches.length ? matches[0] : null;

        return clone(todo); 
    }

    getTodos(): Promise<Todo[]> {
        return clone(this._todos); 
    }

}

function clone<T>(src: T): T {
    return JSON.parse(JSON.stringify(src));
}