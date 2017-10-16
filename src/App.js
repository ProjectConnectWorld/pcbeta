import React, {
  Component
} from 'react';
import './App.css';
import SimpleExample from './components/simpleExample'
import LeftPanel from './components/leftPanel'
import RightPanel from './components/rightPanel'
import Alert from './components/alert'
import Naver from './components/nav'
import Spinner from './components/spinner'
class App extends Component {
  render() {
    return (
      <div>
        <Naver></Naver>
        <Alert></Alert>
        <Spinner></Spinner>
        <LeftPanel></LeftPanel>
        <SimpleExample> </SimpleExample>
        <RightPanel></RightPanel>


      </div>

    );
  }
}

export default App;


// import React, {
//   Component
// } from 'react';
// import './App.css';
//
// class App extends Component {
//   state = {
//     users: []
//   }
//
//   componentDidMount() {
//     fetch('/users')
//       .then(res => res.json())
//       .then(users => this.setState({
//         users
//       }));
//   }
//
//   render() {
//     return (
//       <div className="App">
//         <h1>Users</h1>
//         {this.state.users.map(user =>
//           <div key={user.id}>{user.username}</div>
//         )}
//       </div>
//     );
//   }
// }
//
// export default App;
