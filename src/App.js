import React from 'react';
import { text, highlights } from '@textio/frontend-interview-data';
import logo from './logo.svg';
import './App.css';

console.log("Textio string:", text);
console.log("Textio highlights:", highlights);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
