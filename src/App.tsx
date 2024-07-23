// src/App.tsx
import React from 'react';
import AgricultureTableByYear from './components/AgricultureTableByYear';
import AgricultureTableByCrop from './components/AgricultureTableByCrop';
// import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Agriculture Data</h1>
      <h2>Crop Production by Year</h2>
      <AgricultureTableByYear />
      <h2>Average Yield and Cultivation Area by Crop (1950-2020)</h2>
      <AgricultureTableByCrop />
    </div>
  );
}

export default App;
