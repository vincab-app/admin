import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Drivers from './Pages/Drivers';
import Riders from './Pages/Riders';
import Rides from './Pages/Rides';
import Payments from './Pages/Payments';
import Settings from './Pages/Settings';
import Signin from './Pages/Signin';
import RiderManage from './Pages/RiderManage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/riders" element={<Riders />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/riders/:id" element={<RiderManage />} />

        
      </Routes>
    </Router>
  );
}

export default App;