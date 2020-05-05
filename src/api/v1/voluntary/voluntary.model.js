import mongoose from 'mongoose';

const VoluntarySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    active: {
      type: Boolean,
      require: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

export default mongoose.model('Voluntary', VoluntarySchema);
