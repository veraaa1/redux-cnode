import React, { Component } from 'react';
import './constants/global.scss'

import Cnode from './components/Cnode/Cnode'
import { BrowserRouter} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Cnode/>
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
