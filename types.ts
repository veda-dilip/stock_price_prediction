export interface CompanyInfo {
  name: string;
  ticker: string;
  exchange: string;
}

export interface CurrentPriceInfo {
  price: number;
  change: number;
  change_percent: number;
  direction: 'up' | 'down' | 'neutral';
}

export interface StockDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isPrediction?: boolean;
}

export interface BasicStockData {
  company_info: CompanyInfo;
  current_price_info: CurrentPriceInfo;
  historical_data: StockDataPoint[];
}

export interface KeyMetrics {
  market_cap: string;
  pe_ratio: number | null;
  div_yield: string | null;
  '52_wk_high': number;
  '52_wk_low': number;
  previous_close: number;
}

export interface RelatedStock {
  name: string;
  ticker: string;
  price: number;
  change_percent: number;
  direction: 'up' | 'down' | 'neutral';
}

export interface PredictionResponse {
  predicted_close: number;
  analysis: string;
  rmse: number;
  mae: number;
  r2_score: number;
}

export interface HistoricalPredictionPoint {
  date: string;
  predicted_close: number;
}

export interface AdvancedStockAnalysis {
  key_metrics: KeyMetrics;
  about: string;
  related_stocks: RelatedStock[];
  prediction: PredictionResponse;
  historical_predictions: HistoricalPredictionPoint[];
}

export interface StockAnalysis extends BasicStockData, Partial<AdvancedStockAnalysis> {}