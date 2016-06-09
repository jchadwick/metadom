var TodosService = (function () {
    function TodosService() {
        this._todos = [];
    }
    TodosService.prototype.getTodoById = function (id) {
        var matches = this._todos.filter(function (x) { return x.id == id; }), todo = matches.length ? matches[0] : null;
        return clone(todo);
    };
    TodosService.prototype.getTodos = function () {
        return clone(this._todos);
    };
    return TodosService;
}());
function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
