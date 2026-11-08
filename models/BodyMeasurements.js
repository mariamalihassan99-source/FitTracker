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
  goal: { type: String },
   age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        enum: ['female', 'male'],
        required: true
    },

    activityLevel: {
        type: Number,
        required: true
    }

}, { timestamps: true });

// model
const BodyMeasurements = mongoose.model('BodyMeasurements', bodyMeasurementsSchema)

// export the model
module.exports = BodyMeasurements