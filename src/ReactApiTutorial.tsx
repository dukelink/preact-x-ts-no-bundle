/// <reference path="../node_modules/preact/dist/preact.d.ts" />

namespace reactApiTutorial {
	// Imports:
    const Component=preact.Component,h=preact.h;

    export class App extends Component {
        state = {
            data: []
        };
        
        componentDidMount() {
            const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*&limit=1";
    
            fetch(url)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        data: result
                    })
                });
        }
    
        render() {
            const { data } = this.state;
    
            const result = data.map((entry, index) => {
                console.log(entry);
                return <li key={index}>{entry}</li>;
            });
    
            return <div className="container"><ul>{result}</ul></div>;
        }
    }
}
