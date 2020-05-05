import mongoose from 'mongoose';

import env from '../../config/environment';

const accountabilitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    expirationDate: {
      type: Date,
      require: true
    },
    name: String,
    key: String,
    url: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

accountabilitySchema.pre('save', function save() {
  if (!this.url) {
    this.url = `${env.app.url}${env.app.filesPath}/${this.key}`;
  }
});

export default mongoose.model('Accountability', accountabilitySchema);
