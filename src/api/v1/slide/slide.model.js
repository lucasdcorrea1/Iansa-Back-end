import mongoose from 'mongoose';

import Env from '../../config/environment';

const slideshowSchema = new mongoose.Schema(
  {
    expirationDate: {
      type: Date,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
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

slideshowSchema.pre('save', function save() {
  if (!this.url) {
    this.url = `${Env.app.url}${Env.app.filesPath}/${this.key}`;
  }
});

export default mongoose.model('slideshow', slideshowSchema);
