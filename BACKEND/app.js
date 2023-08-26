const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

connectDB();


app.use('/', routes);

app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`);
});