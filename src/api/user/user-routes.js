const router = require("express").Router();

const authController = require("../auth/auth-controller");
const userController = require("./user-controller");
const authMiddleware = require("../../middlewares/auth");

router.post("/auth", authController.authenticate);
// router.post('/authenticatetoken', authController.authenticateToken);
router.post("/forgotpassword", authController.forgotPassword);

router.put("/resetpassword", authController.resetPassword);

router.post("/register", authMiddleware, userController.create);

module.exports = router;
