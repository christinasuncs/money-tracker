require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client setup
const { createClient } = require('@supabase/supabase-js');

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseURL, supabaseKey);

app.use(express.json());

const accountsRouter = require('./routes/accounts')(supabase);
app.use('/api/accounts', accountsRouter);

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