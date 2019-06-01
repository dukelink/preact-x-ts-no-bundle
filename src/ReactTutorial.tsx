/// <reference path="../lib/preact-beta1-dts-edited/index.d.ts" />

namespace reactTutorial {
	// Imports:
    const Component=preact.Component,h=preact.h;

    export class App extends Component {
        state = {
            characters: []
        };
    
        removeCharacter = index => {
            const { characters } = this.state;
        
            this.setState({
                characters: characters.filter((character, i) => { 
                    return i !== index;
                })
            });
        }
    
        handleSubmit = character => {
            this.setState({characters: [...this.state.characters, character]});
        }
    
        render() {
            const { characters } = this.state;
            
            return (
                <div class='pure-g'>
                    <div class='pure-u-1-5'>
                    </div>
                    <div class='pure-u-3-5'>                        
                        <h1>React Tutorial</h1>
                        <p>Add a character with a name and a job to the table.</p>
                        <Form handleSubmit={this.handleSubmit} />

                        <Table 
                            characterData={characters}
                            removeCharacter={this.removeCharacter}
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
                        <button type="submit">
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