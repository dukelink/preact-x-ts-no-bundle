var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var observed = (function () {
    function observed() {
    }
    return observed;
}());
var Todo;
(function (Todo) {
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item(x) {
            var _this = _super.call(this) || this;
            _this.completed = false;
            _this.title = x;
            return _this;
        }
        Item.prototype.toggleCompleted = function () {
            var model = this.parentObject;
            this.completed = !this.completed;
        };
        return Item;
    }(observed));
    Todo.Item = Item;
    var Views;
    (function (Views) {
        Views[Views["Active"] = 0] = "Active";
        Views[Views["Completed"] = 1] = "Completed";
        Views[Views["All"] = 2] = "All";
    })(Views = Todo.Views || (Todo.Views = {}));
    Todo.NumViews = 3;
    var Model = (function (_super) {
        __extends(Model, _super);
        function Model() {
            var _this = _super.call(this) || this;
            _this.view = Views.All;
            _this.items = [];
            _this.viewCount = function (v) {
                return _this.items.reduce(function (accum, item) {
                    return ((v == Views.All)
                        || (v == Views.Active && !item.completed)
                        || (v == Views.Completed && item.completed))
                        ? ++accum : accum;
                }, 0);
            };
            _this.numActive = function () { return (_this.items.reduce(function (accum, item) { return !item.completed ? ++accum : accum; }, 0)); };
            _this.numCompleted = function () { return (_this.items.reduce(function (accum, item) { return item.completed ? ++accum : accum; }, 0)); };
            _this.numTodos = function () { return (_this.items.length); };
            return _this;
        }
        Model.prototype.addTodo = function (input) {
            var item = (new Item(input));
            item.parentObject = this;
            this.items.unshift(item);
        };
        Model.prototype.setView = function (v) {
            this.view = v;
        };
        Model.prototype.viewItems = function () {
            var _this = this;
            return this.items.filter(function (item) { return (_this.view == Views.All
                || item.completed == (_this.view == Views.Completed)); });
        };
        return Model;
    }(observed));
    Todo.Model = Model;
})(Todo || (Todo = {}));
