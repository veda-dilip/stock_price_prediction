
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg text-center border border-gray-700 hover:border-cyan-500 transition-colors duration-300">
      <p className="text-sm text-gray-400 font-medium">{title}</p>
      <p className="text-2xl font-semibold text-cyan-400 mt-1">{value}</p>
    </div>
  );
};

export default MetricCard;
