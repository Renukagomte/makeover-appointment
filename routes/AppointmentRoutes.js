const { getAppointments, getSingleAppointment, bookingAppointment, destroyAppointment, artistAppointment, userAppointment, deleteAppointment } = require("../controller/appointmentController")
const { authProtected } = require("../middlewares/auth")

const router = require("express").Router()

router
    .get("/", getAppointments)
    .post("/book", authProtected, bookingAppointment)
    .delete("/destroy", destroyAppointment)
    .get("/:aid", getSingleAppointment)
    .get("/artist/:artistId", artistAppointment)
    .get("/user/:userId", userAppointment)
    .delete("/delete/:id", deleteAppointment)


module.exports = router