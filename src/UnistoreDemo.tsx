/// <reference path="../node_modules/preact/dist/preact.d.ts" />
/// <reference path="unistore0.d.ts" />
/// <reference path="unistore1.d.ts" />

//import createStore from "unistore";

namespace UnistoreDemo {
	  // Imports:
    const Component=preact.Component,h=preact.h;
    const createStore = unistore.createStore;
    const connect = unistore.connect;
    const Provider = unistore.Provider;

    const data = { count: 0 };

    let store = createStore(data); // Prob. duplicates storage overhead if 'data' retained????

    // If actions is a function, it gets passed the store:
    let actions = store => ({

      //
      // QX: All function that return a value are 'actions'???
      //     and returned value is updated state?????
      //     - "connect" function that returns a Component
      //       is the key to this functionality...
      //
      
      // Actions can just return a state update:
      increment(state) {
        return { count: state.count+1 }
      },
    
      // The above example as an Arrow Function:
      increment2: ({ count }) => ({ count: count+1 }),
    
      //Actions receive current state as first parameter and any other params next
      //check this function as <button onClick={incrementAndLog}>
      incrementAndLog: (state, event) => {
        const { count } = state;
        console.info(event)
        console.log(data); // never changes!
        console.log(state);
        return { count: count+1 }
      },
    
      // Async actions can be pure async/promise functions:
      async getStuff(state) {
        let res = await fetch('/foo.json')
        return { stuff: await res.json() }
      },
    
      // ... or just actions that call store.setState() later:
      incrementAsync(state) {
        console.log(new Date());
        console.log(state);
        setTimeout( () => {
          store.setState({ count: state.count+1 })
        }, 1000)
      }
    })
    
    const App1 = connect<any,any,any,any>('count', actions)(   // TODO: too many anys???????
        ({ count, incrementAndLog, increment2, incrementAsync }) => (
          <div>
            <p>Count: {count} (direc state update)</p>
            <button onClick={incrementAndLog}>Increment</button>
            <p>Count: {count} (delayed setState)</p>
            <button onClick={increment2}>Increment 2</button>
            <p>Count: {count} (delayed setState)</p>
            <button onClick={incrementAsync}>Increment Async - 1 second delay</button>
          </div>
        )
      )
    

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

}


// ADDITIONAL STUDY:
// Checkout React form validation with TS:
// https://www.carlrippon.com/building-a-react-form-component-with-typescript-validation/
// And see responses of upgraded versions such as:
// https://react-hook-form.now.sh/ and code at: https://github.com/bluebill1049/react-hook-form
// https://stackblitz.com/edit/react-ts-at7b9k

// https://preactjs.com/guide/linked-state
// https://medium.com/@tevthuku/all-hail-unistore-9b2f79184592
// https://github.com/developit/unistore/issues/111

// https://preset-env.cssdb.org
// http://rudiyardley.com/redux-single-line-of-code-rxjs/

// https://blog.logrocket.com/5-redux-libraries-to-improve-code-reuse-9f93eaceaa83

// https://reactjs.org/docs/lifting-state-up.html

// https://stackoverflow.com/questions/50779789/preact-cannot-invoke-passed-function-into-child-component-with-unistoreredux