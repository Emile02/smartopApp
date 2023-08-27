
const mongoose = require('mongoose');

const surgeonsRankSchema = new mongoose.Schema({
  surgeon: String,
  specialty: String,
  anesthsiste: String,
  preferedNurse: String,
  preferedRoom: String,
  topIntervention: String,
});

const SurgeonRank = mongoose.model('surgeonsRank', surgeonsRankSchema);

module.exports = SurgeonRank;
