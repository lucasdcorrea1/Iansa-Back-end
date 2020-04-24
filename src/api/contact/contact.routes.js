const router = require("express").Router();
const { celebrate } = require("celebrate");

const postContact = require("./contact.interfaces");
const controller = require("./contact.controller");

router.post("/", celebrate(postContact), controller.create);

module.exports = router;
