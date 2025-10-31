import React from 'react';
import type { PredictionResponse } from '../types';
import MetricCard from './MetricCard';

interface PredictionCardProps {
  prediction: PredictionResponse;
  ticker: string;
  lastClose?: number;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, ticker, lastClose }) => {
  const { predicted_close, analysis, rmse, mae, r2_score } = prediction;

  const isUp = lastClose !== undefined && predicted_close > lastClose;
  const isDown = lastClose !== undefined && predicted_close < lastClose;
  const change = lastClose !== undefined ? predicted_close - lastClose : 0;
  const changePercent = lastClose !== undefined && lastClose > 0 ? (change / lastClose) * 100 : 0;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl p-6 md:p-8 border border-gray-700 animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-6">AI Prediction for <span className="text-cyan-400">{ticker}</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Prediction */}
        <div className="md:col-span-1 flex flex-col items-center justify-center bg-gray-900/50 p-6 rounded-xl border border-gray-600">
          <p className="text-lg text-gray-400 mb-2">Predicted Next Close</p>
          <p className="text-5xl font-bold text-cyan-300">₹{predicted_close.toFixed(2)}</p>
          {lastClose !== undefined && (
            <div className={`mt-4 px-3 py-1 text-lg font-semibold rounded-full flex items-center
              ${isUp ? 'bg-green-500/20 text-green-300' : ''}
              ${isDown ? 'bg-red-500/20 text-red-300' : ''}
              ${!isUp && !isDown ? 'bg-gray-500/20 text-gray-300' : ''}
            `}>
              {isUp && '▲'}
              {isDown && '▼'}
              <span className="ml-2">{change.toFixed(2)} ({changePercent.toFixed(2)}%)</span>
            </div>
          )}
        </div>

        {/* Right Side: Analysis */}
        <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-3">Model Analysis</h3>
            <p className="text-gray-300 leading-relaxed">{analysis}</p>
        </div>
      </div>
      
      {/* Bottom: Metrics */}
      <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Simulated Model Performance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard title="RMSE" value={rmse.toFixed(4)} />
            <MetricCard title="MAE" value={mae.toFixed(4)} />
            <MetricCard title="R² Score" value={r2_score.toFixed(4)} />
          </div>
      </div>
    </div>
  );
};

export default PredictionCard;