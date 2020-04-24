const router = require("express").Router();

const Env = require("../../config/environment");

const api = [];
api.push({
  name: Env.projectName,
  version: Env.projectVersion,
  date: new Date().toUTCString
});

const route = router.get("/", res => {
  res.status(200).send(api);
});
module.exports = route;
