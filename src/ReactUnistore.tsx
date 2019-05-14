/// <reference path="../node_modules/preact/dist/preact.d.ts" />
/// <reference path="unistore0.d.ts" />
/// <reference path="unistore1.d.ts" />

namespace reactUnistore {
	// Imports:
    const Component=preact.Component,h=preact.h;
    const createStore = unistore.createStore;
    const connect = unistore.connect;
    const Provider = unistore.Provider;

    const data = {
        characters: []
    };

    let store = createStore(data); 

    let actions = store => ({        

        removeCharacter: (state, index) => {
            const { characters } = state;
    
            return({
                characters: characters.filter((character, i) => { 
                    return i !== index;
                })
            });
        },

        handleSubmit: (state,character) => {
            return({characters: [...state.characters, character]});
        }

    });

    export const App1 = connect<any,any,any,any>('characters', actions)(
        ({ characters, removeCharacter, handleSubmit }) => (
            <div className="container">
            <h1>React Unistore</h1>
            <p>Add a character with a name and a job to the table.</p>
            <Table
                characterData={characters}
                removeCharacter={removeCharacter}
            />
            <h3>Add New</h3>
            <Form handleSubmit={handleSubmit} />
        </div>)
    );

    // Following is basically boilerplate to hook up unistore...

    export class App extends Component {
        render() {
            return (
            <div>
              <DefaultApp/>
            </div>
            )
        }
    }

    const DefaultApp = () => (
      <Provider store={store}>
        <App1 />
      </Provider>
    )    

    //-----------------

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
                <form onSubmit={this.onFormSubmit}>
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={name} 
                        onChange={this.handleChange} />
                    <label>Job</label>
                    <input 
                        type="text" 
                        name="job" 
                        value={job} 
                        onChange={this.handleChange} />
                    <button type="submit">
                        Submit
                    </button>
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
                <table>
                    <TableHeader />
                    <TableBody characterData={characterData} removeCharacter={removeCharacter} />
                </table>
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