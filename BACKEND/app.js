//app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const interventionsController = require('./controllers/interventionsController');

const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

connectDB();

app.use('/', routes);
app.use(express.json());


app.post('/save', (req, res) => {
  const receivedData = req.body;
  interventionsController(receivedData);
  res.status(200).json({ message: 'Données reçues avec succès' });
});


app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`);
});