import React, { Component } from 'react';
import './constants/global.scss'
import Container from './containers'
import Cnode from './components/Cnode/Cnode'
import { BrowserRouter} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        {/* <Container/> */}
        <Cnode/>
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
