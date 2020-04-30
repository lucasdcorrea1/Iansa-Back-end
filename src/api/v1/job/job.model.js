import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import mongoose from 'mongoose';
import aws from 'aws-sdk';

import Env from '../../config/environment';

const s3 = new aws.S3();

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  },
  nameFile: String,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

jobSchema.pre('save', function save() {
  if (!this.url) {
    this.url = `${Env.app.url}/files/${this.key}`;
  }
});

jobSchema.pre('remove', function remove() {
  if (Env.storage.type === 's3') {
    return s3
      .deleteObject({
        Bucket: Env.storage.aws.bucket_name,
        Key: this.key
      })
      .promise();
  }
  return promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', '..', 'uploads', this.key)
  );
});

export default mongoose.model('Job', jobSchema);
