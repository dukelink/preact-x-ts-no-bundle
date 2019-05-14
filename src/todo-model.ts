
class observed {
    parentObject : object;
}

namespace Todo { // TODO: Research namespace vs. module?

    export class Item extends observed {
        completed: boolean;
        title: string;

        // TODO: Probably constructor should make observable???
        constructor(x:string) {
            super();
            this.completed = false;
            this.title = x;
        }

        toggleCompleted() {
            const model : Model = <Model>this.parentObject;
            this.completed = !this.completed;
        }
    }

    export enum Views { Active, Completed, All }
    export const NumViews = 3;

    export class Model extends observed {

        view = Views.All; // default view
        items : Item[] = [];

        constructor() {
            super();
        }

        addTodo(input:string)
        {
                let item = (new Item(input));
                item.parentObject = this;
                this.items.unshift(item); 
        }

        setView(v:Views) {
                this.view = v; 
        }

        viewItems() : Item[] {
            return this.items.filter(
                (item) => ( this.view==Views.All
                    || item.completed == (this.view==Views.Completed)) );
        }

        viewCount = (v:Views) =>
            this.items.reduce((accum, item) => 
                (  (v==Views.All)
                || (v==Views.Active && !item.completed)
                || (v==Views.Completed && item.completed))
                    ? ++accum : accum, 0);

        numActive = () => ( 
            this.items.reduce((accum, item) => !item.completed ? ++accum : accum, 0) 
        );

        numCompleted = () => (
            this.items.reduce((accum, item) => item.completed ? ++accum : accum, 0)
        );

        numTodos = () => ( this.items.length );
    }
    
}

// Study:

// https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e


// Poss chnages:

// in Todo.Item.toggleCompleted:
// TODO: Tried to pull this out to get strickout feedback
// w/ active filter before removing from list but didn't work in FF.
// setInterval( () => { Mutate.Change(model.viewItems)}, 10);


// Better practices:

// Always do initializations in constructors instead of on properties to
// avoid duplicate code if done in both places...

// Keep all business rules in classes