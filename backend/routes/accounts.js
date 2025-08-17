const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = (supabase) => {
  // Route to create a new account
  router.post('/create', async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username already exists
    const { data: existingUser, error: checkError } = await supabase
        .from('Accounts')
        .select('*')
        .eq('username', username)
        .single();
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new account into the database
    const { data, error } = await supabase.from('Accounts').insert([
      { username, password: hashedPassword }
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Account created successfully'});
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    const { data, error } = await supabase
        .from('Accounts')
        .select('*')
        .eq('username', username)
        .single();
    if (!data || error) { 
        return res.status(400).json({ error: 'Invalid Credentials'})
    }
    console.log(data)

    valid = await bcrypt.compare(password, data.password)

    if (!valid) {
        return res.status(400).json({ error: 'Invalid Credentials'})
    }
    res.json({message: 'Login successful'})
  })

  router.post('/logout', async (req, res) => {
    res.json({message: 'Logout successful'})
  })
  return router
};