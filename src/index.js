import express from "express";
import cors from "cors";
import { errors } from "celebrate";
import expressOasGenerator from "express-oas-generator";

const envFile = process.env.NODE_ENV === "development" ? `.env.dev` : ".env";
require("dotenv").config({ path: `./env/${envFile}` });

// models
require("./api/v1/user/user.model");
require("./api/v1/slideshow/slideshow.model");
require("./api/v1/transparency/transparency.model");
require("./api/v1/subscription/subscription.model");
require("./api/v1/contact/contact.model");
require("./api/v1/job/job.model");

const app = express();
expressOasGenerator.handleResponses(app, {});

app.use(express.json());
app.use(cors());
// headers
app.use((req, res, next) => {
  const origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// routes
app.use("/api/v1", require("./api/v1/copyright/copyright.routes").default);
app.use("/api/v1", require("./api/v1/contact/contact.routes").default);
app.use("/api/v1", require("./api/v1/slideshow/slideshow.routes").default);
app.use("/api/v1", require("./api/v1/job/job.routes").default);
app.use("/api/v1", require("./api/v1/user/user.routes").default);
app.use(
  "/api/v1",
  require("./api/v1/subscription/subscription.routes").default
);
app.use(
  "/api/v1",
  require("./api/v1/transparency/transparency.routes").default
);

app.use(errors());

expressOasGenerator.handleRequests();
app.listen(process.env.PORT || 3333, () => {});
