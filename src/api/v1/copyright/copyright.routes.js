import express from "express";

import Env from "../../config/environment";

const router = express.Router();

router.get("/", (req, res) => {
  const api = [];
  api.push({
    name: Env.projectName,
    version: Env.projectVersion,
    date: new Date().toUTCString()
  });
  return res.status(200).json(api);
});

export default router;
