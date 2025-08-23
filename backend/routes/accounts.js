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

    valid = await bcrypt.compare(password, data.password)

    if (!valid) {
        return res.status(400).json({ error: 'Invalid Credentials'})
    }
    req.session.user = {
      id: data.id,
      username: data.username
    }
    res.json({message: 'Login successful'})
  })

  router.get('/session', (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not Logged In'})
    }
    return res.json({user: req.session.user})
  })

  router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({error: 'Logout Failed'})
      }
      res.clearCookie('connect.sid');
      res.json({message: 'Logout successful'})
    })
  })
  return router
};