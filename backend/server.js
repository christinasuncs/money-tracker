require('dotenv').config();
const express = require('express');
const session = require('express-session')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client setup
const { createClient } = require('@supabase/supabase-js');

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseURL, supabaseKey);

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // frontend URL 
  credentials: true
}))
app.use(session({
  secret: 'your_secret_key', // use env var in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true if using HTTPS
}))

const accountsRouter = require('./routes/accounts')(supabase);
app.use('/api/accounts', accountsRouter);

const transactionsRouter = require('./routes/transactions')(supabase);
app.use('/api/transactions', transactionsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test-supabase', async (req, res) => {
  const { data, error } = await supabase.from('Accounts').select('*').limit(1);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});