import Path from 'path';

import pack from '../../../../package.json';

// All configurations will extend these options
// ============================================
const all = {
  api: {
    environment: process.env.NODE_ENV,
    projectName: pack.name,
    projectVersion: pack.version,
    root: Path.normalize(Path.join(__dirname, '/../../..')),
    port: process.env.API_PORT || 3333
  },
  app: {
    url: process.env.APP_URL,
    filesPath: process.env.APP_FILES_PATH
  },
  auth: {
    secret: process.env.AUTH_SECRET,
    expiresIn: process.env.AUTH_EXPIRES_IN
  },
  mongo: {
    url: process.env.MONGO_URL
  },
  sendgrid: {
    api_key: process.env.SENDGRID_API_KEY,
    sender_email: process.env.SENDGRID_SENDER_EMAIL
  },
  storage: {
    type: process.env.STORAGE_TYPE,
    aws: {
      accessKeyId: process.env.STORAGE_AWS_ACCESS_KEY,
      secretAccessKey: process.env.STORAGE_AWS_SECRET_ACCESS_KEY,
      region: process.env.STORAGE_AWS_REGION,
      bucket_name: process.env.STORAGE_AWS_BUCKET_NAME
    }
  }
};

// eslint-disable-next-line no-console
// console.log(all);

export default all;
