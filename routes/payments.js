const Router = require("express").Router();
const PaymentController = require("../controllers/payments");
const upload = require("../middlewares/multer");
const authorization = require("../middlewares/authorization");
const { PATIENT } = require("../constants/role");

Router.use(authorization(PATIENT));

Router.post(
  "/upload-slip/:payment_id",
  upload.single("profile_photo"),
  PaymentController.uploadPaymentSlip
);

module.exports = Router;