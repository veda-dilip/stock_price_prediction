import React from 'react';
import type { KeyMetrics as KeyMetricsType } from '../types';

interface KeyMetricsProps {
    metrics: KeyMetricsType;
}

const MetricItem: React.FC<{ label: string; value: string | number | null }> = ({ label, value }) => (
    <div>
        <dt className="text-sm text-gray-400">{label}</dt>
        <dd className="text-lg font-semibold text-white mt-1">{value ?? 'N/A'}</dd>
    </div>
);

const KeyMetrics: React.FC<KeyMetricsProps> = ({ metrics }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Key Metrics</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8">
                <MetricItem label="Market Cap" value={metrics.market_cap} />
                <MetricItem label="P/E Ratio" value={metrics.pe_ratio} />
                <MetricItem label="Div Yield" value={metrics.div_yield} />
                <MetricItem label="Previous Close" value={`₹${metrics.previous_close.toFixed(2)}`} />
                <MetricItem label="52-wk High" value={`₹${metrics['52_wk_high'].toFixed(2)}`} />
                <MetricItem label="52-wk Low" value={`₹${metrics['52_wk_low'].toFixed(2)}`} />
            </dl>
        </div>
    );
};

export default KeyMetrics;
