const { registerEmployee, getEmployees, getSingleEmployee, destroyEmployee, getartists, employeeLogin, getBookings } = require("../controller/employeeController")
const { authProtected } = require("../middlewares/auth")

const router = require("express").Router()

router
    .get("/", getEmployees)
    .get("/bookings",authProtected, getBookings)
    .get("/artists", getartists)
    .get("/:eid", getSingleEmployee)
    .post("/register", registerEmployee)
    .post("/login", employeeLogin)
    .delete("/destroy", destroyEmployee)


module.exports = router