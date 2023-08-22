const express = require('express');
const cors = require('cors');
const csvParser = require('csv-parser');
const fs = require('fs');
require('dotenv').config();


const mongoose = require('mongoose');
const Intervention = require('./models/user');

const app = express();

const port = process.env.PORT || 3000;;

app.use(cors());

mongoose.connect("mongodb+srv://emiledb:OsKNeLPtlbNDmXR0@smartopopdb.ikeph7x.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', async () => {
    console.log('Connected to MongoDB');
    
    const totalCount = await Intervention.countDocuments();
    console.log(totalCount);
    // if (totalCount > 0)
    //     await Intervention.collection.drop();
    if (totalCount === 298)
        return console.log('Database already filled.');

    let lineCount = 0;

  fs.createReadStream('./interventions.csv')
    .pipe(csvParser({
        separator: ';' // problème de parsing, j'ai donc ajouté la lecture du séparateur ';'
    }))

    .on('data', (data) => {
        lineCount++;
        const values = Object.values(data);
        const newInterventions = new Intervention({
                surgeon: values[0],
                specialty: values[1],
                anesthsiste: values[2],
                nurse1: values[3],
                nurse2: values[4],
                roomNumber: values[5],
                intervention: values[6],
            });
            newInterventions.save();
      })
      .on('end', () => {
        console.log('Data dumped to MongoDB');
      });
});

app.listen(port, async () => {
      console.log(`Server is running on port ${port}`);
});

app.get('/interventions', async (req, res) => {
  try {
      const interventions = await Intervention.find(); // Récupère toutes les interventions depuis la base de données
      res.json(interventions); // Renvoie les interventions au frontend au format JSON
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching interventions.' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express server!' });
});