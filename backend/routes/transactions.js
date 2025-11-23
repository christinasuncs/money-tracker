// get 1 transaction - not needed yet
// get all transaction that belong to 1 account - done
// create new transaction - done
// update a transaction
// remove a transaction

const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
    // Get all transactions for the currently logged-in user (session-based)
    router.get('/', async (req, res) => {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Not logged in'})
        }
        const accountId = req.session.user.id
        try {
            const { data, error } = await supabase
                .from('Transactions')
                .select('*')
                .eq('account_id', accountId)
            if (error) {
                return res.status(500).json({ error: 'Failed to fetch transactions'})
            }
            return res.json({data: data})
        } catch (error) {
            console.error('Server error: ', error)
            return res.status(500).json({error: 'Internal server error'})
        }
    })

    // Get all transactions that belong to 1 account
    router.get('/:accountId', async (req, res) => {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Not logged in'})
        }
        const accountId = req.params.accountId
        if (accountId != req.session.user.id) {
            return res.status(403).json({ error: 'Unauthorized access'})
        }
        try {
            const { data, error } = await supabase
                .from('Transactions')
                .select('*')
                .eq('account_id', accountId)
            if (error) { 
                return res.status(500).json({ error: 'Failed to fetch transactions'})
            }
            return res.json({data: data})
        } catch (error) {
            console.error('Server error: ', error)
            return res.status(500).json({error: 'Internal server error'})
        }
    })
    // Create
    router.post('/', async (req, res) => {
        if (!req.session.user) { // check if user is logged in
            return res.status(401).json({ error: 'Not logged in'})
        }
        const { amount, notes, transaction_date, category } = req.body
        const account_id = req.session.user.id
        if (!amount || !notes || !transaction_date) {
            return res.status(400).json({error: 'Missing required fields. Please provide amount, note, and transaction date.'})
        }
        try {
            const { data, error } = await supabase
                .from('Transactions')
                .insert({ 
                    account_id, 
                    amount,
                    notes,
                    transaction_date,
                    category
                })
                .select()
            if (error) {
                console.error("Error creating transaction: ", error)
                return res.status(500).json({error: "Failed to create transactions."})
            }
            res.status(201).json({message: "Transaction created successfully", transaction: data})
        } catch (error) {
            console.error('Server error: ', error)
            return res.status(500).json({error: 'Internal server error'})
        }
    })
    // Update
    router.put('/:transactionId', async (req, res) => {
        if (!req.session.user) { // check if user is logged in
            return res.status(401).json({ error: 'Not logged in'})
        }
        const { amount, notes, transaction_date, category } = req.body
        const account_id = req.session.user.id
        const transactionId = req.params.transactionId
        if (!amount || !notes || !transaction_date) {
            return res.status(400).json({error: 'Invalid fields entered. Please provide amount, note, and transaction date.'})
        }
        try {
            const { data, error } = await supabase
                .from('Transactions')
                .update({ 
                    account_id, 
                    amount,
                    notes,
                    transaction_date,
                    category
                 })
                .eq('id', transactionId)
                .select()
            if (error) {
                console.error("Error updating transaction: ", error)
                return res.status(500).json({error: "Failed to update transaction."})
            }
            res.status(201).json({message: "Transaction updated successfully", transaction: data})
        } catch (error) {
            console.error('Server error: ', error)
            return res.status(500).json({error: 'Internal server error'})
        }
    }) 
    // Delete
    router.delete('/:transactionId', async (req, res) => {
        if (!req.session.user) { // check if user is logged in
            return res.status(401).json({ error: 'Not logged in'})
        }
        const transactionId = req.params.transactionId
        try {
            const { data, error } = await supabase
                .from('Transactions')
                .delete()
                .eq('id', transactionId)
                .select()
            if (error) {
                console.error("Error deleting transaction: ", error)
                return res.status(500).json({error: "Failed to delete transaction."})
            }
            res.status(201).json({message: "Transaction deleted successfully", transaction: data})
        } catch (error) {
            console.error('Server error: ', error)
            return res.status(500).json({error: 'Internal server error'})
        }
    }) 
    return router
}