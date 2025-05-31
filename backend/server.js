require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const authRoute = require('./routes/auth.js'); // Import the auth route
const eventRoute = require('./routes/event.js'); // Import the event route


// Middleware
app.use(cors());
app.use(express.json());

// Sample Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', authRoute);
app.use('/api/event', eventRoute);

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Database connection error:', err));
