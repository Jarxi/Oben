const express  = require('express');
const app = require('./api/app');

app.get('/', (req, res) => res.send('Hello World'));

app.listen(process.env.PORT, ()=> console.log(`Oben node listening on port ${process.env.PORT}`));

