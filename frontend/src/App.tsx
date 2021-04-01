import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import RootRoutes from './routing/RootRouting';

import Topbar from './components/Topbar/Topbar';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Topbar />
      <RootRoutes />
      <Navbar />
    </div>
  );
}

export default App;
