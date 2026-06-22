const { getMarketSentimentNews } = require('../../services/market/newsService');

exports.getMarketNews = async (req, res, next) => {
  try {
    const tags = req.query.tickers || 'technology,finance';
    const newsData = await getMarketSentimentNews(tags);
    return res.status(200).json({ success: true, data: newsData });
  } catch (err) {
    next(err);
  }
};
