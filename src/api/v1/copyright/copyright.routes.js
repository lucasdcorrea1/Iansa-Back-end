import express from "express";

import Env from "../../config/environment";

const router = express.Router();

router.get("/", (req, res) => {
  const api = [];
  api.push({
    name: Env.api.projectName,
    version: Env.api.projectVersion,
    date: new Date().toUTCString()
  });
  return res.status(200).json(api);
});

export default router;
