'use strict'

const Path = require("path");
const pack = require("../../../package.json");

// All configurations will extend these options
// ============================================
const all = {
  environment: process.env.NODE_ENV,
  root: Path.normalize(Path.join(__dirname, "/../../..")),
  port: process.env.PORT || 3333,
  system: process.env.SYSTEM,
  projectName: pack.name,
  projectVersion: pack.version,
  auth: process.env.AUTH,
  gmail_user: process.env.GMAIL_USER,
  mongo_url: process.env.MONGO_URL,
  mail_user: process.env.MAIL_USER,
  mail_pass: process.env.MAIL_PASS,
  app_url: process.env.APP_URL,
  bucket_name: process.env.BUCKET_NAME,
  storage_type: process.env.STORAGE_TYPE,
};
console.log(all);
// Export the config object based on the NODE_ENV
// ==============================================
module.exports = all;