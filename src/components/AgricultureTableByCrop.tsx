// src/components/AgricultureTableByCrop.tsx
import React from 'react';
import { processAgricultureDataByCrop } from '../utils/dataProcessor';
import './styles/AgricultureTableByCrop.css'; // Import the CSS file

const AgricultureTableByCrop: React.FC = () => {
  // this extracts data from function in dataProcessor
  const data = processAgricultureDataByCrop(); 

  return (
    //Table for data
    <table>
      <thead>
        <tr>
          <th>Crop</th>
          <th>Average Yield of the Crop between 1950-2020</th>
          <th>Average Cultivation Area of the Crop between 1950-2020</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.crop}>
            <td>{row.crop}</td>
            <td>{row.averageYield.toFixed(3)}</td>
            <td>{row.averageArea.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AgricultureTableByCrop;
