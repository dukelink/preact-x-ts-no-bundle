/// <reference path="../node_modules/preact/dist/preact.d.ts" />

// https://github.com/developit/preact/issues/1036

namespace myapp {
	const Component = preact.Component;
	const h = preact.h;
  
  export interface AppProps {
    name: string;
  }

  interface AppState {
    name: string;
  }

  export class TestComponent extends Component<AppState> { 
    constructor(props: AppProps) {
      super(props);
      this.state = { name: props.name, status: "initial" };
    }

    componentDidMount() {
      setTimeout(() => { 
        var state : any = this.state;
        state.status = "componentDidMount() lifecycle event called.";
        this.setState(state);
      }, 2000);
    }

    render = (props: AppProps, state: AppState) => (
      <div>
        <h1>{props.name}</h1>
        <ul>
          <li>props:<br/>{JSON.stringify(props)}</li> 
          <li>state:<br/>{JSON.stringify(state)}</li>
        </ul>
      </div>      
    )
  }

}