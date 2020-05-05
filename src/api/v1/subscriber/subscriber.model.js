import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    active: {
      type: Boolean,
      require: true,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

export default mongoose.model('Subscriber', SubscriberSchema);
