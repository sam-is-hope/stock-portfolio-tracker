import pandas as pd
import numpy as np

def add_technical_indicators(df):
    df['Returns'] = df['close'].pct_change()
    
    # Simple Moving Averages
    df['SMA_10'] = df['close'].rolling(window=10).mean()
    df['SMA_50'] = df['close'].rolling(window=50).mean()
    
    # Exponential Moving Average
    df['EMA_20'] = df['close'].ewm(span=20, adjust=False).mean()
    
    # Relative Strength Index (RSI)
    delta = df['close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / (loss + 1e-9)
    df['RSI_14'] = 100 - (100 / (1 + rs))
    
    # MACD Setup
    df['MACD'] = df['close'].ewm(span=12, adjust=False).mean() - df['close'].ewm(span=26, adjust=False).mean()
    df['MACD_Signal'] = df['MACD'].ewm(span=9, adjust=False).mean()
    
    return df.ffill().bfill()
