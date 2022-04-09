require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const app = express();

const budgetItems = require('./models/budget.js')

app.get('/budgets', (req, res) => {
    res.send(budgetItems);
});

app.get('/budgets/:index', (req, res) => {
    res.send(budgetItems[req.params.index]);
});

app.listen(PORT, () => {
    console.log(`You're listening to smooth jazz on port ${PORT}!`);
});