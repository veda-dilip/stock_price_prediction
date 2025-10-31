import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonDataPoint {
  date: string;
  actual_close: number;
  predicted_close: number | null;
}

interface PredictionComparisonChartProps {
  data: ComparisonDataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 p-4 rounded-lg shadow-lg">
        <p className="label text-gray-300">{`${label}`}</p>
        {payload.map((pld: any) => (
          <p key={pld.dataKey} style={{ color: pld.color }}>
            {`${pld.name}: ₹${pld.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PredictionComparisonChart: React.FC<PredictionComparisonChartProps> = ({ data }) => {
    const formattedData = useMemo(() => {
        return data.map(d => ({
            ...d,
            date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));
    }, [data]);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
        <XAxis 
            dataKey="date" 
            stroke="#9ca3af" 
            tick={{ fontSize: 12 }} 
            interval="preserveStartEnd"
            tickCount={7}
        />
        <YAxis 
            stroke="#9ca3af" 
            tickFormatter={(value) => `₹${Number(value).toFixed(0)}`} 
            tick={{ fontSize: 12 }} 
            domain={['dataMin - 10', 'dataMax + 10']}
            allowDataOverflow
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
            verticalAlign="top" 
            height={36} 
            formatter={(value) => <span className="text-gray-300">{value}</span>}
        />
        <Line 
          type="monotone" 
          dataKey="actual_close" 
          name="Actual Close" 
          stroke="#22d3ee" 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="predicted_close" 
          name="Predicted Close" 
          stroke="#f472b6" 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PredictionComparisonChart;