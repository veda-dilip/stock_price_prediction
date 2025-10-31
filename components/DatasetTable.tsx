import React from 'react';
import type { StockDataPoint } from '../types';

interface DatasetTableProps {
  data: StockDataPoint[];
}

const DatasetTable: React.FC<DatasetTableProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-4">Historical Dataset (Last 90 Days)</h3>
      <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-700">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-cyan-300 uppercase bg-gray-900/70 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Open (₹)</th>
              <th scope="col" className="px-6 py-3">High (₹)</th>
              <th scope="col" className="px-6 py-3">Low (₹)</th>
              <th scope="col" className="px-6 py-3">Close (₹)</th>
              <th scope="col" className="px-6 py-3">Volume</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.date} className="bg-gray-800/50 border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {new Date(row.date).toLocaleDateString('en-CA')}
                </td>
                <td className="px-6 py-4">{row.open.toFixed(2)}</td>
                <td className="px-6 py-4">{row.high.toFixed(2)}</td>
                <td className="px-6 py-4">{row.low.toFixed(2)}</td>
                <td className="px-6 py-4 font-semibold text-cyan-400">{row.close.toFixed(2)}</td>
                <td className="px-6 py-4">{row.volume.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatasetTable;