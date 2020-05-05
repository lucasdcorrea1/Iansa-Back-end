import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true,
      lowercase: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

export default mongoose.model('Message', MessageSchema);
