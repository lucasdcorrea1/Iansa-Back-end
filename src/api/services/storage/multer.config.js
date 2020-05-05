import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import env from '../../config/environment';
import { buildResponse as Response } from '../../helpers/response';

aws.config.update({
  secretAccessKey: env.storage.aws.secretAccessKey,
  accessKeyId: env.storage.aws.accessKeyId,
  region: env.storage.aws.region
});

const s3 = new aws.S3();

const storageType = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(
        null,
        path.resolve(__dirname, '..', '..', '..', '..', 'public', 'uploads')
      );
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
    bucket: env.storage.aws.bucket_name,
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

export function configMulterSingleFile() {
  return multer({
    dest: path.resolve(__dirname, '..', '..', '..', '..', 'public', 'uploads'),
    storage: storageType[env.storage.type],
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
  if (env.storage.type === 's3') {
    return s3
      .deleteObject({
        Bucket: env.storage.aws.bucket_name,
        Key: obj.key
      })
      .promise();
  }
  if (env.storage.type === 'local') {
    const file = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'uploads',
      obj.key
    );
    return fs.unlink(file, err => {
      if (err) throw err;
    });
  }
}

export async function validateSchema(req, res, next, schema, schemaDomainName) {
  try {
    const schemaValidation = await schema.validate(req);

    if (schemaValidation.error) {
      if (req.file) {
        await this.deleteFile(req.file);
      }
      return Response(
        res,
        400,
        schemaValidation.error.message,
        {
          validation: {
            source: schemaValidation.error.details[0].path[0] || '',
            keys: [schemaValidation.error.details[0].path[1] || '']
          }
        },
        true
      );
    }
    return next();
  } catch (error) {
    return Response(
      res,
      500,
      `Erro ao validar ${schemaDomainName}: ${error}`,
      null,
      true
    );
  }
}
