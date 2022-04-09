require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const app = express();
const budgetItems = require('./models/budget.js')

app.use(express.urlencoded({ extended: false }));

app.get('/budgets', (req, res) => {
    res.render('index.ejs', { allBudgetItems: budgetItems });
});

app.get('/budgets/new', (req, res) => {
    res.render('new.ejs')
})

app.get('/budgets/:index', (req, res) => {
    res.render('show.ejs', { budgetItem: budgetItems[req.params.index] });
});

app.post('/budgets', (req, res) => {
    req.body.tags = req.body.tags.replace(',', '')
    req.body.tags = req.body.tags.split(' ')
    budgetItems.push(req.body)
    res.redirect('/budgets')
});

app.listen(PORT, () => {
    console.log(`You're listening to smooth jazz on port ${PORT}!`);
});