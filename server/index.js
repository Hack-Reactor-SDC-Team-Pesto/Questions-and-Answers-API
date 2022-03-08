const express = require('express');
const axios = require('axios');
const path = require('path');
const {} = require ("../database/index.js")

const PORT = 3000;
const app = express();

// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json())

app.get('/{product}', (req, res) => {

  console.log('TEST MET')
});


app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});