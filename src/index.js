const envFile = process.env.NODE_ENV === "development" ? `.env.dev` : ".env";
require("dotenv").config({ path: `./env/${envFile}` });

const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const expressOasGenerator = require("express-oas-generator");
const _ = require("lodash");

const Env = require("./config/environment");

const app = express();
expressOasGenerator.handleResponses(app, {
  predefinedSpec(spec) {
    _.set(
      spec,
      'paths["/foo/{name}"].get.parameters[0].description',
      "description of a parameter"
    );
    return spec;
  },
  specOutputPath: "./test_spec.json"
});

app.use(express.json());
app.use(cors());

// models
require("./api/user/user.model");
require("./api/slideshow/slideshow.model");
require("./api/transparency/transparency.model");
require("./api/subscription/subscription.model");
require("./api/contact/contact.model");
require("./api/job/job.model");

// headers
app.use((req, res, next) => {
  const origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// routes
app.use("/api/v1", require("./api/copyright/copyright-routes"));
app.use("/api/v1/contact", require("./api/contact/contact.routes"));
app.use("/api/v1/slideshow", require("./api/slideshow/slideshow.routes"));
app.use("/api/v1/job", require("./api/job/job.routes"));
app.use("/api/v1/user", require("./api/user/user.routes"));
app.use(
  "/api/v1/subscription",
  require("./api/subscription/subscription.routes")
);
app.use(
  "/api/v1/transparency",
  require("./api/transparency/transparency.routes")
);

app.use(errors());

expressOasGenerator.handleRequests();
app.listen(Env.port, () => {});
