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
