import pandas as pd
from prophet import Prophet

class ProphetStockForecaster:
    def __init__(self, growth='linear', yearly_seasonality=True, weekly_seasonality=True):
        self.growth = growth
        self.yearly_seasonality = yearly_seasonality
        self.weekly_seasonality = weekly_seasonality
        self.model = None

    def fit_and_forecast(self, dates, prices, periods=30):
        df = pd.DataFrame({'ds': pd.to_datetime(dates), 'y': prices})
        self.model = Prophet(
            growth=self.growth,
            yearly_seasonality=self.yearly_seasonality,
            weekly_seasonality=self.weekly_seasonality
        )
        self.model.fit(df)
        
        future = self.model.make_future_dataframe(periods=periods, freq='D')
        forecast = self.model.predict(future)
        
        output_df = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
        return output_df.to_dict(orient='records')
