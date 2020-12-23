const Router = require("express").Router();
const reviewRouter = require("./review");
const patientRouter = require("./patient");
const psikiaterRouter = require("./psikiater");
const authRoutes = require("./auth");
const appointmentRouter = require("./appoinments");

Router.use("/auth", authRoutes);

Router.use("/reviews", reviewRouter);

Router.use("/patients", patientRouter);

Router.use("/psikiater", psikiaterRouter);

Router.use("/appointments", appointmentRouter);

module.exports = Router;
