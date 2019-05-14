/// <reference path="../node_modules/preact/dist/preact.d.ts" />

// https://github.com/developit/preact/issues/1036
declare module JSX {
  interface IntrinsicElements {
    "my-dropdown": any
  }
}
namespace stencilWC {
  const h = preact.h;
  const Component = preact.Component;

	export class myDropdown extends Component
	{
    items = [
      {
        label: 'Spiderman',
        publisher: 'Marvel'
      },
      {
        label: 'Batman',
        publisher: 'DC'
      },
      {
        label: 'Saga',
        publisher: 'Image Comics'
      },
      {
        label: 'Hellboy',
        publisher: 'Dark Horse Comics'
      }
    ];

    constructor() {
        super();                
        this.state = {items: this.items };
    }   

    componentDidMount() {
        const el = document.querySelector('my-dropdown');
        el.listItems = this.items; // could be state
        el.addEventListener('clickedItem', (event) => {
          alert(event);
        })
    }
    
    render = (props,state) => {  
      return (
      <div>
        <h1>Stencil Custom Element</h1>
        <p>
          { JSON.stringify(this.state) }
        </p>
        <hr/>
        <label>
          Add new list item: 
          <input type="text" onChange={ 
            (e: Event) => {
              let targ : any;
              targ = e.target;
              state.items.push({label:targ.value,publisher:''});
              this.setState(state);
              targ.value = '';
            }
          } />
        </label>
        <hr/>
        <p>
          <my-dropdown data-no-work-clickedItem={(e)=>alert(e)}> {/* TODO: why no work? */}
            <label slot="title">Comics</label>
            <span slot="icon" class="fas fa-caret-down"></span>
          </my-dropdown>          
        </p>
      </div>      
    )}
  }

}