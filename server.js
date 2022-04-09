require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const app = express();



app.listen(PORT, () => {
    console.log(`You're listening to smooth jazz on port ${PORT}!`)
})