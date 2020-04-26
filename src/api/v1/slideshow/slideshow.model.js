import fs from "fs";
import path from "path";
import { promisify } from "util";

import mongoose from "mongoose";
import aws from "aws-sdk";

import Env from "../../config/environment";

const s3 = new aws.S3();

const slideshowSchema = new mongoose.Schema({
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
});

slideshowSchema.pre("save", function save() {
  if (!this.url) {
    this.url = `${Env.app_url}/files/${this.key}`;
  }
});

slideshowSchema.pre("remove", function remove() {
  if (Env.storage_type === "s3") {
    return s3
      .deleteObject({
        Bucket: Env.bucket_name,
        Key: this.key
      })
      .promise();
  }
  return promisify(fs.unlink)(
    path.resolve(__dirname, "..", "..", "uploads", this.key)
  );
});

export default mongoose.model("slideshow", slideshowSchema);
