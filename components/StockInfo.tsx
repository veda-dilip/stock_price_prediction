import React from 'react';
import type { CompanyInfo, CurrentPriceInfo } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from './icons';

interface StockInfoProps {
    companyInfo: CompanyInfo;
    priceInfo: CurrentPriceInfo;
}

const StockInfo: React.FC<StockInfoProps> = ({ companyInfo, priceInfo }) => {
    const isUp = priceInfo.direction === 'up';
    const isDown = priceInfo.direction === 'down';
    const changeColor = isUp ? 'text-green-400' : isDown ? 'text-red-400' : 'text-gray-400';

    return (
        <div>
            <div>
                <h1 className="text-4xl font-bold text-white">{companyInfo.name}</h1>
                <p className="text-lg text-gray-400 mt-1">{companyInfo.exchange}: {companyInfo.ticker}</p>
            </div>
            <div className="mt-4 flex items-end gap-4">
                <p className="text-5xl font-bold text-white">₹{priceInfo.price.toFixed(2)}</p>
                <div className={`flex items-center text-2xl font-semibold ${changeColor}`}>
                    {isUp && <ArrowUpIcon className="h-6 w-6" />}
                    {isDown && <ArrowDownIcon className="h-6 w-6" />}
                    <span className="ml-1">{priceInfo.change.toFixed(2)}</span>
                    <span className="ml-2">({priceInfo.change_percent.toFixed(2)}%)</span>
                </div>
            </div>
        </div>
    );
};

export default StockInfo;
