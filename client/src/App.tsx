import React from 'react';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import Store from './store';

function App() {
  return (
    <Provider store={Store}>
      <div className='App'>
        <h1> Hallo React its Walid</h1>
      </div>
    </Provider>
  );
}

export default App;
