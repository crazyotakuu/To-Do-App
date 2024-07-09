const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

connectDB();

const app = express();

// Only allow requests from this origin
const corsOptions = {
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200,
};

// Use the configured CORS options
app.use(cors(corsOptions)); 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the To-Do App');
  });
  
app.use('/api', require('./routes/route'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
