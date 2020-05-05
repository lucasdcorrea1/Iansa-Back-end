import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import Env from '../../config/environment';

aws.config.update({
  secretAccessKey: Env.storage.aws.secretAccessKey,
  accessKeyId: Env.storage.aws.accessKeyId,
  region: Env.storage.aws.region
});

const s3 = new aws.S3();

const storageType = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        file.key = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.key);
      });
    }
  }),
  s3: multerS3({
    s3,
    bucket: Env.storage.aws.bucket_name,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    }
  })
};

export function configMulter() {
  return multer({
    dest: path.resolve(__dirname, '..', '..', '..', 'uploads'),
    storage: storageType[Env.storage.type],
    limits: {
      fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif',
        'application/pdf'
      ];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type.'));
      }
    }
  }).single('file');
}

export function deleteFile(obj) {
  if (Env.storage.type === 's3') {
    return s3
      .deleteObject({
        Bucket: Env.storage.aws.bucket_name,
        Key: obj.key
      })
      .promise();
  }
  if (Env.storage.type === 'local') {
    const file = path.resolve(__dirname, '..', '..', '..', 'uploads', obj.key);
    return fs.unlink(file, err => {
      if (err) throw err;
    });
  }
}
