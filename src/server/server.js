/*
require('dotenv').config() must be ran before require('./api/*')
The APIs require the environment variables to be loaded!
*/
require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
