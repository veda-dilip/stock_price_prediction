import React, { useState, useCallback, useMemo } from 'react';
import { StockAnalysis, StockDataPoint } from './types';
import { fetchBasicStockData, fetchAdvancedStockAnalysis } from './services/geminiService';
import Header from './components/Header';
import TickerInput from './components/TickerInput';
import StockChart from './components/StockChart';
import PredictionCard from './components/PredictionCard';
import Loader from './components/Loader';
import { ChartIcon } from './components/icons';
import StockInfo from './components/StockInfo';
import KeyMetrics from './components/KeyMetrics';
import RelatedStocks from './components/RelatedStocks';
import AboutCompany from './components/AboutCompany';
import SkeletonLoader from './components/SkeletonLoader';
import DatasetTable from './components/DatasetTable';
import PredictionComparisonChart from './components/PredictionComparisonChart';


const App: React.FC = () => {
  const [ticker, setTicker] = useState<string>('TCS');
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (submittedTicker: string) => {
    if (!submittedTicker) {
      setError('Please enter a stock ticker.');
      return;
    }
    setIsLoading(true);
    setIsAnalyzing(false);
    setAnalysis(null);
    setError(null);
    setTicker(submittedTicker.toUpperCase());

    try {
      // Step 1: Fetch basic data for fast initial render
      const basicData = await fetchBasicStockData(submittedTicker.toUpperCase());
      basicData.historical_data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAnalysis(basicData);
      setIsLoading(false);
      setIsAnalyzing(true);

      // Step 2: Fetch advanced analysis in the background
      const advancedData = await fetchAdvancedStockAnalysis(submittedTicker.toUpperCase());
      setAnalysis(prev => prev ? ({...prev, ...advancedData}) : null);

    } catch (err) {
      console.error('Error fetching stock analysis:', err);
      setError('Failed to fetch stock analysis. The AI might be busy. Please try again.');
      setIsLoading(false);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);
  
  const chartData = useMemo(() => {
    if (!analysis?.historical_data) return [];
    
    // The API returns newest first, but chart needs oldest first.
    const sortedHistoricalData = [...analysis.historical_data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (analysis.prediction) {
      const lastDataPoint = sortedHistoricalData[sortedHistoricalData.length - 1];
      if (lastDataPoint) {
        const nextDay = new Date(lastDataPoint.date);
        nextDay.setDate(nextDay.getDate() + 1);

        const predictionPoint: StockDataPoint = {
          date: nextDay.toISOString().split('T')[0],
          open: 0,
          high: 0,
          low: 0,
          close: analysis.prediction.predicted_close,
          volume: 0,
          isPrediction: true,
        };
        return [...sortedHistoricalData, predictionPoint];
      }
    }
    return sortedHistoricalData;
  }, [analysis]);

  const comparisonChartData = useMemo(() => {
    if (!analysis?.historical_data || !analysis?.historical_predictions) {
      return [];
    }

    const predictionsMap = new Map(
      analysis.historical_predictions.map(p => [new Date(p.date).toISOString().split('T')[0], p.predicted_close])
    );

    return analysis.historical_data
      .map(item => ({
        date: new Date(item.date).toISOString().split('T')[0],
        actual_close: item.close,
        predicted_close: predictionsMap.get(new Date(item.date).toISOString().split('T')[0]) || null,
      }))
      .filter(item => item.predicted_close !== null)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [analysis?.historical_data, analysis?.historical_predictions]);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl p-6 md:p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Stock Symbol</h2>
          <p className="text-gray-400 mb-6">Enter an Indian stock ticker (e.g., TCS, RELIANCE, INFY) to generate a full analysis and predict the next closing price.</p>
          <TickerInput onSubmit={handleAnalyze} isLoading={isLoading || isAnalyzing} initialTicker={ticker} />
        </div>

        {error && (
          <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 flex flex-col items-center justify-center space-y-4">
            <Loader />
            <p className="text-cyan-400">Fetching initial stock data...</p>
          </div>
        )}
        
        {!analysis && !isLoading && !error && (
            <div className="mt-8 text-center bg-gray-800/50 p-10 rounded-2xl border border-gray-700">
                <ChartIcon className="mx-auto h-16 w-16 text-gray-600"/>
                <h3 className="mt-4 text-xl font-semibold text-gray-300">Ready to Analyze</h3>
                <p className="mt-2 text-gray-400">Enter a stock ticker above to begin.</p>
            </div>
        )}

        {analysis && analysis.company_info && (
          <div className="mt-8 animate-fade-in">
            <StockInfo companyInfo={analysis.company_info} priceInfo={analysis.current_price_info!} />
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border border-gray-700">
                        <h3 className="text-2xl font-bold text-white mb-4">Price History &amp; Prediction</h3>
                        <div className="h-96 w-full">
                            {chartData.length > 0 ? <StockChart data={chartData} /> : <SkeletonLoader className="h-full w-full" />}
                        </div>
                    </div>

                    {isAnalyzing && !analysis.historical_predictions && <SkeletonLoader className="h-[28rem] w-full rounded-2xl" />}
                    {analysis.historical_predictions && comparisonChartData.length > 0 && (
                        <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl p-6 border border-gray-700">
                            <h3 className="text-2xl font-bold text-white mb-4">Model Performance: Actual vs. Predicted</h3>
                            <div className="h-96 w-full">
                                <PredictionComparisonChart data={comparisonChartData} />
                            </div>
                        </div>
                    )}

                    {analysis.historical_data && <DatasetTable data={analysis.historical_data} />}

                    {isAnalyzing && !analysis.key_metrics && <SkeletonLoader className="h-48 w-full rounded-2xl" />}
                    {analysis.key_metrics && <KeyMetrics metrics={analysis.key_metrics} />}

                    {isAnalyzing && !analysis.prediction && <SkeletonLoader className="h-72 w-full rounded-2xl" />}
                    {analysis.prediction && <PredictionCard prediction={analysis.prediction} ticker={analysis.company_info.ticker} lastClose={analysis.current_price_info!.price} />}
                </div>
                <div className="lg:col-span-1 flex flex-col gap-8">
                    {isAnalyzing && !analysis.related_stocks && <SkeletonLoader className="h-64 w-full rounded-2xl" />}
                    {analysis.related_stocks && <RelatedStocks stocks={analysis.related_stocks} />}
                    
                    {isAnalyzing && !analysis.about && <SkeletonLoader className="h-40 w-full rounded-2xl" />}
                    {analysis.about && <AboutCompany name={analysis.company_info.name} about={analysis.about} />}
                </div>
            </div>
          </div>
        )}

      </main>
        <footer className="text-center py-6 text-gray-500 text-sm">
            <p>AI Stock Predictor &copy; 2024. For educational purposes only.</p>
        </footer>
    </div>
  );
};

export default App;