const router = require("express").Router();

const Env = require("../../config/environment");

const Development = [Env.projectName];
Development.push({
  "Made by": "Lucas Damas Corrês",
  GitHub: "https://github.com/lucasdcorrea1"
});

const route = router.get("/", (req, res) => {
  res.status(200).send({
    Development
  });
});
module.exports = route;
