import logo from './logo.svg';
import './App.css';
import { DroneScheduler } from './drone/DroneScheduler';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <header>
        <DroneScheduler></DroneScheduler>
      </header>
    </div>
  );
}

export default App;
