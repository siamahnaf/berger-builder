import React from 'react';
import './App.css';
import Main from './Components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store'

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
