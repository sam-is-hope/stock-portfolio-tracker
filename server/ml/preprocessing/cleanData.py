import pandas as pd
import numpy as np

def clean_historical_data(raw_json_data):
    if not raw_json_data or 'Time Series (Daily)' not in raw_json_data:
        raise ValueError("Invalid time-series schema structure passed for cleaning.")
        
    time_series = raw_json_data['Time Series (Daily)']
    df = pd.DataFrame.from_dict(time_series, orient='index')
    
    df = df.rename(columns={
        '1. open': 'open',
        '2. high': 'high',
        '3. low': 'low',
        '4. close': 'close',
        '5. volume': 'volume'
    })
    
    df.index = pd.to_datetime(df.index)
    df = df.sort_index(ascending=True)
    
    for col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')
        
    df = df.ffill().bfill()
    return df
