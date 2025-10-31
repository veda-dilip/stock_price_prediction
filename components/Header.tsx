
import React from 'react';
import { BrainCircuitIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <BrainCircuitIcon className="h-8 w-8 text-cyan-400 mr-3" />
        <h1 className="text-2xl font-bold text-white tracking-tight">
          AI Stock Predictor
        </h1>
      </div>
    </header>
  );
};

export default Header;
