const AdminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const AppointmentModel = require("../models/appointments");
const PatientModel = require("../models/patients");
const emailer = require("../utilities/emailer");

class AdminController {
  static createAdmin = async (req, res, next) => {
    try {
      const { first_name, last_name, password, email } = req.body;

      const admin = await AdminModel.create({
        first_name,
        last_name,
        password: bcrypt.hashSync(password, 10),
        email,
      });

      if (!admin) {
        throw new Error("Failed creating admin");
      }

      res
        .status(202)
        .json({
          status: "success",
          message: "Successfully created admin",
          data: admin,
        });
    } catch (error) {
      next(error);
    }
  };

  static updateStatusByAppointmentID = async (req, res, next) => {
    const { patient_id } = req.body;
    try {
      const PatientData = await PatientModel.findById(patient_id);
      const Data = {
        email: PatientData.email,
      };
      const {status} = req.body;
      const { appointment_id } = req.body;
      const AppointmentData = await AppointmentModel.findByIdAndUpdate(
        appointment_id,
        { status: status },
        { new: true }
      );
     
      const FindAppointmentData = await AppointmentModel.findById(appointment_id);
      const statusAppointment = FindAppointmentData.status;
      if (statusAppointment === "Unpaid") {
        const emailSent = await emailer(
            PatientData.email,
            "Payment Status",
            `<h3><strong>Payment Reject Again</strong></h3>`
          );
      }else if (statusAppointment === "Paid") {
        const emailSent = await emailer(
          PatientData.email,
          "Payment Status",
          `<h3><strong>Payment Success</strong></h3>`
        );
      }

      res.status(200).json({
        status: "Success",
        data: Data,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AdminController;