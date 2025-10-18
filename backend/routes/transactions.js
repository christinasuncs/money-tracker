// get 1 transaction
// get all transaction that belong to 1 account
// create new transaction
// update a transaction
// remove a transaction

const express = require('express');
const router = express.Router();

module.exports = (supabase) => {
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
    return router
}