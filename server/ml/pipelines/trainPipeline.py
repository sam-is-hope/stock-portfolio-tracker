import sys
import json
from cleanData import clean_historical_data
from featureEngineering import add_technical_indicators
from lstmModel import LSTMStockPredictor

def run_training_pipeline(json_input_path, model_output_path):
    with open(json_input_path, 'r') as f:
        raw_data = json.load(f)
        
    cleaned_df = clean_historical_data(raw_data)
    engineered_df = add_technical_indicators(cleaned_df)
    
    close_prices = engineered_df['close'].values
    
    predictor = LSTMStockPredictor(sequence_length=60)
    history = predictor.train(close_prices, epochs=10, batch_size=16)
    
    predictor.model.save(model_output_path)
    print(f"Training executed successfully. Loss convergence: {history.history['loss'][-1]}")

if __name__ == '__main__':
    if len(sys.argv) > 2:
        run_training_pipeline(sys.argv[1], sys.argv[2])
