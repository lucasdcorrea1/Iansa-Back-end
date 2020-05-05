import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VoluntarySchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    cpf: {
      type: Number,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    addressNumber: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date
    },
    gender: {
      type: String
    },
    bloodType: {
      type: String
    },
    mainActivity: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

export default mongoose.model('Voluntary', VoluntarySchema);
