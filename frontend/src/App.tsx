import React from 'react';
import './App.scss';
import RootRoutes from './routing/RootRouting';


import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <RootRoutes />
      <Navbar />
    </div>
  );
}

export default App;
