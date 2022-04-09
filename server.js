require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const app = express();
const budgetItems = require('./models/budget.js')
let bankAccount = budgetItems.map(item => item.amount).reduce((a, b) => b + a)

const changeToRed = () => {
    document.querySelector('body').style.backgroundColor = 'rgb(187, 64, 64)'
    document.querySelector('table').style.color = 'white'
    document.querySelector('button').style.color = 'white'
    document.querySelector('a:link').style.color = 'white'
    document.querySelector('a:visited').style.color = 'rgb(189, 186, 186)'
}

const changeToBlue = () => {
    document.querySelector('body').style.backgroundColor = 'rgb(33, 88, 189)'
    document.querySelector('table').style.color = 'white'
    document.querySelector('button').style.color = 'white'
    document.querySelector('a:link').style.color = 'white'
    document.querySelector('a:visited').style.color = 'rgb(189, 186, 186)'
}

app.use(express.urlencoded({ extended: false }));

app.get('/budgets', (req, res) => {
    res.render('index.ejs', 
    { 
        allBudgetItems: budgetItems, 
        calculateBalance: bankAccount,
        allRed: changeToRed,
        allBlue: changeToBlue 
    });
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
    bankAccount = bankAccount + Number(req.body.amount)
    budgetItems.push(req.body)
    res.redirect('/budgets')
});

app.listen(PORT, () => {
    console.log(`You're listening to smooth jazz on port ${PORT}!`);
});