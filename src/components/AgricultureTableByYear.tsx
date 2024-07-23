// src/components/AgricultureTableByYear.tsx
import React from 'react';
import { processAgricultureDataByYear } from '../utils/dataProcessor';

const AgricultureTableByYear: React.FC = () => {
  const data = processAgricultureDataByYear();

  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production</th>
          <th>Crop with Minimum Production</th>
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
