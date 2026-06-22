import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Input
from sklearn.preprocessing import MinMaxScaler

class LSTMStockPredictor:
    def __init__(self, sequence_length=60):
        self.sequence_length = sequence_length
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.model = None

    def build_model(self, input_shape):
        model = Sequential([
            Input(shape=input_shape),
            LSTM(units=100, return_sequences=True),
            Dropout(0.2),
            LSTM(units=100, return_sequences=False),
            Dropout(0.2),
            Dense(units=50, activation='relu'),
            Dense(units=1)
        ])
        model.compile(optimizer='adam', loss='mean_squared_error')
        self.model = model
        return model

    def prepare_data(self, data_array):
        scaled_data = self.scaler.fit_transform(data_array.reshape(-1, 1))
        X, y = [], []
        for i in range(self.sequence_length, len(scaled_data)):
            X.append(scaled_data[i-self.sequence_length:i, 0])
            y.append(scaled_data[i, 0])
        return np.array(X), np.array(y)

    def train(self, data_array, epochs=25, batch_size=32):
        X, y = self.prepare_data(data_array)
        X = np.reshape(X, (X.shape[0], X.shape[1], 1))
        self.build_model((X.shape[1], 1))
        history = self.model.fit(X, y, epochs=epochs, batch_size=batch_size, verbose=0)
        return history

    def predict_next_days(self, data_array, days_to_forecast=7):
        scaled_data = self.scaler.transform(data_array.reshape(-1, 1))
        last_sequence = scaled_data[-self.sequence_length:]
        current_batch = last_sequence.reshape((1, self.sequence_length, 1))
        
        future_predictions = []
        for _ in range(days_to_forecast):
            current_pred = self.model.predict(current_batch, verbose=0)[0]
            future_predictions.append(current_pred)
            current_batch = np.append(current_batch[:, 1:, :], [[current_pred]], axis=1)
            
        return self.scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1)).flatten()
