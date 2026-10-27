require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const spendPaths = require('./paths/spendPaths');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ app: 'MangoLedger API', status: 'ok' });
});

app.use('/api/expenses', spendPaths);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Bad JSON body' });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

async function start() {
  if (!MONGO_URI) {
    console.error('MONGO_URI is missing. Check backend/.env');
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

start();
