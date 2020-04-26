import express from "express";

import * as Validator from "./contact.interfaces";
import controller from "./contact.controller";

const router = express.Router();

router.post("/contact", Validator.postContact, controller.create);

export default router;
