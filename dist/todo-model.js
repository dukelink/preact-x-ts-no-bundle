class observed {
}
var Todo;
(function (Todo) {
    class Item extends observed {
        constructor(x) {
            super();
            this.completed = false;
            this.title = x;
        }
        toggleCompleted() {
            const model = this.parentObject;
            this.completed = !this.completed;
        }
    }
    Todo.Item = Item;
    let Views;
    (function (Views) {
        Views[Views["Active"] = 0] = "Active";
        Views[Views["Completed"] = 1] = "Completed";
        Views[Views["All"] = 2] = "All";
    })(Views = Todo.Views || (Todo.Views = {}));
    Todo.NumViews = 3;
    class Model extends observed {
        constructor() {
            super();
            this.view = Views.All;
            this.items = [];
            this.viewCount = (v) => this.items.reduce((accum, item) => ((v == Views.All)
                || (v == Views.Active && !item.completed)
                || (v == Views.Completed && item.completed))
                ? ++accum : accum, 0);
            this.numActive = () => (this.items.reduce((accum, item) => !item.completed ? ++accum : accum, 0));
            this.numCompleted = () => (this.items.reduce((accum, item) => item.completed ? ++accum : accum, 0));
            this.numTodos = () => (this.items.length);
        }
        addTodo(input) {
            let item = (new Item(input));
            item.parentObject = this;
            this.items.unshift(item);
        }
        setView(v) {
            this.view = v;
        }
        viewItems() {
            return this.items.filter((item) => (this.view == Views.All
                || item.completed == (this.view == Views.Completed)));
        }
    }
    Todo.Model = Model;
})(Todo || (Todo = {}));
