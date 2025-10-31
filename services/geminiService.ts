import { GoogleGenAI, Type } from "@google/genai";
import type { BasicStockData, AdvancedStockAnalysis } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
const model = "gemini-2.5-flash";

async function generateContentWithSchema<T>(prompt: string, schema: any): Promise<T> {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as T;
  } catch (error) {
    console.error("Error fetching or parsing data from Gemini:", error);
    throw new Error("Failed to generate data from AI model.");
  }
}


export async function fetchBasicStockData(ticker: string): Promise<BasicStockData> {
  const currentDate = new Date().toISOString().split('T')[0];
  const prompt = `
Generate essential stock information for the Indian stock ticker "${ticker}".
The JSON object must strictly adhere to the provided schema.
All currency values must be in Indian Rupees (INR).
Today's date is ${currentDate}.

Provide the following:
1.  "company_info": Details about the company (name, ticker, exchange).
2.  "current_price_info": The most recent (today's) simulated price information, as of ${currentDate}.
3.  "historical_data": An array of the last 90 trading days of stock data, with the most recent date being ${currentDate} or the last trading day before it. The data must be ordered from newest to oldest.
`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      company_info: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ticker: { type: Type.STRING },
          exchange: { type: Type.STRING },
        },
        required: ["name", "ticker", "exchange"],
      },
      current_price_info: {
        type: Type.OBJECT,
        properties: {
          price: { type: Type.NUMBER },
          change: { type: Type.NUMBER },
          change_percent: { type: Type.NUMBER },
          direction: { type: Type.STRING, enum: ["up", "down", "neutral"] },
        },
        required: ["price", "change", "change_percent", "direction"],
      },
      historical_data: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING },
            open: { type: Type.NUMBER },
            high: { type: Type.NUMBER },
            low: { type: Type.NUMBER },
            close: { type: Type.NUMBER },
            volume: { type: Type.INTEGER },
          },
          required: ["date", "open", "high", "low", "close", "volume"],
        },
      },
    },
    required: ["company_info", "current_price_info", "historical_data"]
  };

  return generateContentWithSchema<BasicStockData>(prompt, schema);
}


export async function fetchAdvancedStockAnalysis(ticker: string): Promise<AdvancedStockAnalysis> {
    const currentDate = new Date().toISOString().split('T')[0];
    const prompt = `
You are an expert financial AI. Your task is to generate an advanced stock analysis for the Indian stock ticker "${ticker}".
Your analysis and prediction should be based on a simulated high-performance model inspired by the 'Transformer and Time2Vec' architecture from academic research (e.g., DOI: 10.1109/ICAIIC64266.2025.10920805).
Today's date is ${currentDate}.

The JSON object must strictly adhere to the provided schema.
All currency values must be in Indian Rupees (INR).

Provide the following:
1. "key_metrics": Important financial metrics. Market cap should be a string like "11.07LCr". 'pe_ratio' or 'div_yield' can be null.
2. "about": A concise, one-paragraph description of the company's business.
3. "related_stocks": An array of 4-5 related Indian companies or competitors.
4. "prediction": An AI-driven prediction for the next day's closing price (i.e., for the day after ${currentDate}).
   - The 'analysis' text should be concise but sound professional, briefly mentioning how concepts like 'temporal encoding with Time2Vec' and 'multi-head attention' help capture market dynamics to justify the prediction.
   - The performance metrics must be very strong to reflect this advanced model. Generate a simulated R² score between 0.92 and 0.95, with correspondingly low RMSE and MAE values.
5. "historical_predictions": An array of predicted closing prices for each of the last 90 trading days, with the most recent date being ${currentDate} or the last trading day before it. Each object must have a 'date' (YYYY-MM-DD) and a 'predicted_close'. The predictions should closely track the actual prices but with some variance to simulate a realistic, high-performance model.
`;

    const schema = {
        type: Type.OBJECT,
        properties: {
             key_metrics: {
              type: Type.OBJECT,
              properties: {
                market_cap: { type: Type.STRING },
                pe_ratio: { type: Type.NUMBER, nullable: true },
                div_yield: { type: Type.STRING, nullable: true },
                '52_wk_high': { type: Type.NUMBER },
                '52_wk_low': { type: Type.NUMBER },
                previous_close: { type: Type.NUMBER },
              },
              required: ["market_cap", "pe_ratio", "div_yield", "52_wk_high", "52_wk_low", "previous_close"],
            },
            about: { type: Type.STRING },
            related_stocks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  ticker: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                  change_percent: { type: Type.NUMBER },
                  direction: { type: Type.STRING, enum: ["up", "down", "neutral"] },
                },
                required: ["name", "ticker", "price", "change_percent", "direction"],
              },
            },
            prediction: {
              type: Type.OBJECT,
              properties: {
                predicted_close: { type: Type.NUMBER },
                analysis: { type: Type.STRING },
                rmse: { type: Type.NUMBER },
                mae: { type: Type.NUMBER },
                r2_score: { type: Type.NUMBER },
              },
              required: ["predicted_close", "analysis", "rmse", "mae", "r2_score"],
            },
            historical_predictions: {
              type: Type.ARRAY,
              items: {
                  type: Type.OBJECT,
                  properties: {
                      date: { type: Type.STRING },
                      predicted_close: { type: Type.NUMBER },
                  },
                  required: ["date", "predicted_close"],
              },
            },
        },
        required: ["key_metrics", "about", "related_stocks", "prediction", "historical_predictions"]
    };

    return generateContentWithSchema<AdvancedStockAnalysis>(prompt, schema);
}