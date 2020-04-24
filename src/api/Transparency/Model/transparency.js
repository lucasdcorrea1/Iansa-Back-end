const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Env = require( "../../../config/environment");

const s3 = new aws.S3();

const transparencySchema = new mongoose.Schema({
  expirationDate: {
    type: Date,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  name: String,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

transparencySchema.pre('save', function () {
  if (!this.url) {
    this.url = `${Env.app_url}/files/${this.key}`;
  };
});

transparencySchema.pre('remove', function () {
  if (Env.storage_type === 's3') {
    return s3.deleteObject({
      Bucket: Env.bucket_name,
      Key: this.key,
    }).promise()
  } else {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', this.key))
  }
});

module.exports = mongoose.model('transparency', transparencySchema);