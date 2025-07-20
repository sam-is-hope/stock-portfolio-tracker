const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const portfolioRoutes = require('./routes/portfolioRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/portfolio', portfolioRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log('MongoDB connected'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
