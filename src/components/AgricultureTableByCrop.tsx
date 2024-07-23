// src/components/AgricultureTableByCrop.tsx
import React from 'react';
import { processAgricultureDataByCrop } from '../utils/dataProcessor';

const AgricultureTableByCrop: React.FC = () => {
  const data = processAgricultureDataByCrop();

  return (
    <table>
      <thead>
        <tr>
          <th>Crop</th>
          <th>Average Yield (1950-2020)</th>
          <th>Average Cultivation Area (1950-2020)</th>
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
