import sys
import json
import numpy as np
from tensorflow.keras.models import load_model
from cleanData import clean_historical_data
from lstmModel import LSTMStockPredictor

def run_forecast_pipeline(json_input_path, model_path, days_to_predict=7):
    with open(json_input_path, 'r') as f:
        raw_data = json.load(f)
        
    cleaned_df = clean_historical_data(raw_data)
    close_prices = cleaned_df['close'].values
    
    predictor = LSTMStockPredictor(sequence_length=60)
    predictor.model = load_model(model_path)
    predictor.scaler.fit(close_prices.reshape(-1, 1))
    
    predictions = predictor.predict_next_days(close_prices, days_to_forecast=int(days_to_predict))
    
    print(json.dumps(predictions.tolist()))

if __name__ == '__main__':
    if len(sys.argv) > 2:
        run_forecast_pipeline(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else 7)
