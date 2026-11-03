const mongoose = require('mongoose');
//a
const bodyMeasurementsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  chest: { type: Number },
  waist: { type: Number },
  hips: { type: Number } ,
  goal: { type: String }
},{
  timestamps: true
} );

// model
const BodyMeasurements = mongoose.model('BodyMeasurements', bodyMeasurementsSchema)

// export the model
module.exports = BodyMeasurements