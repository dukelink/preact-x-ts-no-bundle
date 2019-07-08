namespace hookStore {
    function setState(newState) {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach((listener) => {
            listener(this.state);
        });
    }
    
    function useCustom(React) {
        const newListener = React.useState()[1];
        React.useEffect(() => {
            this.listeners.push(newListener);
            return () => {
                this.listeners = this.listeners.filter(listener => listener !== newListener);
            };
        }, []);
        return [this.state, this.actions];
    }
    
    function associateActions(store, actions) {
        const associatedActions = {};
        Object.keys(actions).forEach((key) => {
            if (typeof actions[key] === 'function') 
                associatedActions[key] = actions[key].bind(null, store);
            if (typeof actions[key] === 'object') 
                associatedActions[key] = associateActions(store, actions[key]);
        });
        return associatedActions;
    }
    
    export const useStore = (initialState, actions, initializer?:any) => {
        const store = { state: initialState, listeners: [] };
        store["setState"] = setState.bind(store);
        store["actions"] = associateActions(store, actions);
        if (initializer) initializer(store);
        return useCustom.bind(store, preactHooks);
    };
}

namespace reactHooks {
	// Imports:
    const Component=preact.Component,h=preact.h,useState=preactHooks.useState;
    const useStore=hookStore.useStore;

    const initialState = {
        count: 0,
    };
    
    const actions = {
        addToCounter: ({state,setState}, amount) => {
            const newCounterValue = state.count + amount;
            setState({ count: newCounterValue });
        },
    };
    
    const useGlobal = useStore( initialState, actions);

    export const Example = () => {
        const [globalState, globalActions] = useGlobal();
        return (
            <div>
            <p>You clicked {globalState.count} times</p>
            <button onClick={() => globalActions.addToCounter(1)}>
                Click me
            </button>
            </div>
        );
    }


    const initialState2 = {
        characters: []
    };


    for (let i=1; i<500; i++)
        initialState2.characters.push({ name: 'name_'+i, job:i })

    const actions2 = {
        removeCharacter: ({state,setState},index) => {
            const { characters } = state;
        
            setState({
                characters: characters.filter((character, i) => { 
                    return i !== index;
                })
            });
        },
    
        handleSubmit: ({state,setState},character) => {
            setState({characters: [...state.characters, character]});
        }
    }

    const useGlobal2 = useStore( initialState2, actions2);

    export class App extends Component {

        render() {
            const [globalState, globalActions] = useGlobal2();
            
            return (
                <div class='pure-g'>
                    <div class='pure-u-1-5'></div>
                    <div class='pure-u-3-5'>                        
                        <h1>React Tutorial</h1>
                        <hr/>
                        <Example />
                        <hr/>
                        <p>Add a character with a name and a job to the table.</p>
                        <Form handleSubmit={globalActions.handleSubmit} />

                        <Table 
                            characterData={globalState.characters}
                            removeCharacter={globalActions.removeCharacter}
                        />
                    </div>
                </div>
            );
        }
    }

    export interface AppState {
        name : string;
        job : string;
    }

    interface AppProps {
        handleSubmit: (character) => (void);
    }

    class Form extends Component<AppProps,AppState> // These interface required for TS
    {
        initialState = {
            name: '',
            job: ''
        };

        constructor(props:AppProps) {
            super(props);                
            this.state = this.initialState;
        }
    
        handleChange = event => {
            const { name, value } = event.target;
  
            const newState : any = { [name] : value }; // separate out as 'any' type require
            this.setState(newState);
        }
    
        onFormSubmit = (event) => {
            event.preventDefault();
            
            this.props.handleSubmit(this.state);
            this.setState(this.initialState);
        }
    
        render() {
            const { name, job } = this.state;  // destructuring requires interfaces with TS

            return (
                <form onSubmit={this.onFormSubmit} class="pure-form pure-form-aligned">
                    <div class="pure-control-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={this.handleChange} />
                    </div>
                    <div class="pure-control-group">
                        <label>Job</label>
                        <input 
                            type="text" 
                            name="job" 
                            value={job} 
                            onChange={this.handleChange} />
                    </div>
                    <div class="pure-controls">
                        <button type="submit" style={{backgroundColor:"ivory"}}>
                            Submit
                        </button>
                    </div>
                </form>
            );
        }
    }
    
    const TableHeader = () => { 
        return (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Remove</th>
                </tr>
            </thead>
        );
    }
    
    const TableBody = props => { 
        const rows = props.characterData.map((row, index) => {
            return (
                <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.job}</td>
                    <td><button onClick={() => props.removeCharacter(index)}>Delete</button></td>
                </tr>
            );
        });
    
        return <tbody>{rows}</tbody>;
    }
    
    class Table extends Component<{characterData,removeCharacter}> {
        render() {
            const { characterData, removeCharacter } = this.props;
    
            return (
                !characterData.length ? '' :
                <div>
                    <br/>
                    <hr/>
                    <table class='pure-table pure-table-bordered'>
                        <TableHeader />
                        <TableBody characterData={characterData} removeCharacter={removeCharacter} />
                    </table>
                </div>
            );
        }
    }
    
}


// ADDITIONAL STUDY:
// Checkout React form validation with TS:
// https://www.carlrippon.com/building-a-react-form-component-with-typescript-validation/
// And see responses of upgraded versions such as:
// https://react-hook-form.now.sh/ and code at: https://github.com/bluebill1049/react-hook-form
// https://stackblitz.com/edit/react-ts-at7b9k