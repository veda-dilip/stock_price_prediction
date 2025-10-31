import React, { useMemo } from 'react';
import type { StockDataPoint } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';

interface StockChartProps {
  data: StockDataPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const price = dataPoint.close;
    const volume = dataPoint.volume;
    const labelText = dataPoint.isPrediction ? 'Predicted Close' : 'Close Price';
    
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-600 p-4 rounded-lg shadow-lg">
        <p className="label text-gray-300">{`${label}`}</p>
        <p className="intro text-cyan-400">{`${labelText}: ₹${price.toFixed(2)}`}</p>
        {volume !== undefined && volume !== null && <p className="text-gray-400">{`Volume: ${volume.toLocaleString()}`}</p>}
      </div>
    );
  }
  return null;
};

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  // Memoize formatted data for performance
  const { formattedData, predictionSegment, yDomain } = useMemo(() => {
    const formatted = data.map(d => ({
      ...d,
      date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

    const predictionIndex = formatted.findIndex(d => d.isPrediction);
    
    // The prediction segment starts from the last historical point to the predicted point
    const segment = predictionIndex !== -1 ? formatted.slice(predictionIndex - 1) : [];
    
    // Calculate Y-axis domain with padding
    const allValues = data.map(p => p.close).filter(v => v != null) as number[];
    let domain: (number | string)[] = ['auto', 'auto'];
    if (allValues.length > 0) {
      const min = Math.min(...allValues);
      const max = Math.max(...allValues);
      const padding = (max - min) * 0.1 || 5; // Add a fallback padding
      domain = [min - padding, max + padding];
    }
    
    return { formattedData: formatted, predictionSegment: segment, yDomain: domain };
  }, [data]);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
          </linearGradient>
        </defs>
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
          domain={yDomain}
          allowDataOverflow={true}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
            verticalAlign="top" 
            height={36} 
            formatter={(value) => <span className="text-gray-300">{value}</span>}
        />
        
        <Area 
          type="monotone" 
          dataKey="close" 
          name="Close Price" 
          stroke="#22d3ee" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#colorClose)" 
          connectNulls
        />
        
        {predictionSegment.length > 0 && (
          <Line
            type="monotone"
            data={predictionSegment}
            dataKey="close"
            name="Prediction"
            stroke="#14b8a6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 5, strokeWidth: 2, fill: '#14b8a6' }}
            activeDot={{ r: 7 }}
          />
        )}

        {/* Hidden series for tooltip */}
        <Line dataKey="volume" stroke="transparent" legendType="none" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
