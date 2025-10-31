import React from 'react';
import type { RelatedStock } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from './icons';

interface RelatedStocksProps {
    stocks: RelatedStock[];
}

const RelatedStocks: React.FC<RelatedStocksProps> = ({ stocks }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Explore More</h2>
            <div className="space-y-4">
                {stocks.map((stock) => {
                    const isUp = stock.direction === 'up';
                    const isDown = stock.direction === 'down';
                    const changeColor = isUp ? 'bg-green-500/20 text-green-300' : isDown ? 'bg-red-500/20 text-red-300' : 'bg-gray-500/20 text-gray-300';

                    return (
                        <div key={stock.ticker} className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-white">{stock.name}</p>
                                <p className="text-sm text-gray-400">{stock.ticker}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-white">₹{stock.price.toFixed(2)}</p>
                                <div className={`mt-1 text-sm font-semibold px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${changeColor}`}>
                                    {isUp && <ArrowUpIcon className="h-4 w-4" />}
                                    {isDown && <ArrowDownIcon className="h-4 w-4" />}
                                    {stock.change_percent.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedStocks;
