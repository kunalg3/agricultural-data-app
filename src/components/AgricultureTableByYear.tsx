// src/components/AgricultureTableByYear.tsx
import React from 'react';
import { processAgricultureDataByYear } from '../utils/dataProcessor';
import './styles/AgricultureTableByYear.css'; // Import the CSS file

const AgricultureTableByYear: React.FC = () => {
  // this extracts data from function in dataProcessor
  const data = processAgricultureDataByYear();

  return (
    //Table for data
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production in that Year</th>
          <th>Crop with Minimum Production in that Year</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.Year}>
            <td>{row.Year}</td>
            <td>{row.maxCrop}</td>
            <td>{row.minCrop}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AgricultureTableByYear;
