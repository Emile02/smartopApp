
const mongoose = require('mongoose');

const InterventionSchema = new mongoose.Schema({
  surgeon: String,
  specialty: String,
  anesthsiste: String,
  nurse1: String,
  nurse2: String,
  roomNumber: String,
  intervention: String,
});

const Intervention = mongoose.model('Intervention', InterventionSchema);

module.exports = Intervention;
