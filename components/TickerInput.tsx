import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface TickerInputProps {
  onSubmit: (ticker: string) => void;
  isLoading: boolean;
  initialTicker: string;
}

const TickerInput: React.FC<TickerInputProps> = ({ onSubmit, isLoading, initialTicker }) => {
  const [ticker, setTicker] = useState(initialTicker);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(ticker);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative flex-grow w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="e.g., TCS"
          className="w-full bg-gray-700/50 border border-gray-600 rounded-full py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-800 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105"
      >
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};

export default TickerInput;
