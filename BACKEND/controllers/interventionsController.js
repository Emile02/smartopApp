const mongoose = require('mongoose');

const SurgeonRankSchema = new mongoose.Schema({
  surgeon: String,
  speciality: String,
  totalInterventions: String,
  anesthsiste: String,
  nurses: String,
  preferedRoom: String,
  mostIntervention: String
});

const SurgeonRank = mongoose.model('SurgeonRank', SurgeonRankSchema);

const interventionsController = async (data) => {
  const totalCount = await SurgeonRank.countDocuments();
  if (totalCount === 37)
    return console.log("DB already fill");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    for ( const datasInfo of data) {
        const result = await SurgeonRank.create({
          surgeon: datasInfo.surgeon,
          speciality: datasInfo.speciality,
          totalInterventions: datasInfo.totalInterventions,
          anesthsiste: datasInfo.anesthsiste,
          nurses: datasInfo.nurses,
          preferedRoom: datasInfo.preferedRoom,
          mostIntervention: datasInfo.mostIntervention,
        });
      console.log('Data inserted:', result);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

module.exports = interventionsController;
module.exports = SurgeonRank;
