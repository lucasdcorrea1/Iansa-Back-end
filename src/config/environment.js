const Path = require("path");

const pack = require("../../package.json");

// All configurations will extend these options
// ============================================
const all = {
  environment: process.env.NODE_ENV,
  root: Path.normalize(Path.join(__dirname, "/../../..")),
  port: process.env.PORT || 3333,
  projectName: pack.name,
  projectVersion: pack.version,
  app_url: process.env.APP_URL,
  auth: process.env.AUTH,
  mongo_url: process.env.MONGO_URL,
  sendgrid_api_key: process.env.SENDGRID_API_KEY,
  sendgrid_sender_email: process.env.SENDGRID_SENDER_EMAIL,
  bucket_name: process.env.BUCKET_NAME,
  storage_type: process.env.STORAGE_TYPE
};
// eslint-disable-next-line no-console
console.log(all);
module.exports = all;
