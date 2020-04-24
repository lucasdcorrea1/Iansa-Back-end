const envFile = process.env.NODE_ENV === "development" ? `.env.dev` : ".env";
require("dotenv").config({ path: `./env/${envFile}` });

const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");

const Env = require("./config/environment");

const app = express();

app.use(express.json());
app.use(cors());

// models
require("./models/user");
require("./models/slideshow");
require("./models/transparency");
require("./models/subscription");
require("./models/contact");
require("./models/job");

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
app.use("/api/v1/slideshow", require("./api/slideshow/slideshow-routes"));
app.use("/api/v1/contact", require("./api/contact/contact-routes"));
app.use("/api/v1/job", require("./api/job/job-routes"));
app.use("/api/v1/user", require("./api/user/user-routes"));
app.use(
  "/api/v1/subscription",
  require("./api/subscription/subscription-routes")
);
app.use(
  "/api/v1/transparency",
  require("./api/transparency/transparency-routes")
);

app.use(errors());

app.listen(Env.port, () => {});
