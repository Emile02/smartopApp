const mongoose = require('mongoose');
const Intervention = require('../models/totalDB');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connecté à MongoDB');

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'Erreur de connexion :'));

        db.once('open', async () => {
            console.log('Connecté à MongoDB');

            const totalCount = await Intervention.countDocuments();
            console.log(totalCount);

            if (totalCount === 298) {
                return console.log('Base de données déjà remplie.');
            }

            let lineCount = 0;

            fs.createReadStream('./interventions.csv')
                .pipe(csvParser({
                    separator: ';'
                }))
                .on('data', (data) => {
                    lineCount++;
                    const values = Object.values(data);
                    const newIntervention = new Intervention({
                        surgeon: values[0],
                        specialty: values[1],
                        anesthsiste: values[2],
                        nurse1: values[3],
                        nurse2: values[4],
                        roomNumber: values[5],
                        intervention: values[6],
                    });
                    newIntervention.save();
                })
                .on('end', () => {
                    console.log('Données ajoutées à MongoDB');
                });
        });
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
    }
};

module.exports = connectDB;
