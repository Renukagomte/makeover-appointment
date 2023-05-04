require("dotenv").config({ path: ".env" })
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { connectDB } = require("./config/db")


connectDB()
const app = express()
app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin: "https://makeover-appointment-production.up.railway.app",
    credentials: true
}))
app.use("/employee", require("./routes/employeeRoutes"))
app.use("/appointment", require("./routes/AppointmentRoutes"))
app.use("/user", require("./routes/userRoutes"))

mongoose.connection.once("open", () => {
    console.log("DB CONNECTED");
})
mongoose.connection.on("error", err => {
    console.log("DB CONNECTION ERROR", err)
})

app.listen(process.env.PORT || 5000, err => {
    if (err) {
        return console.log("UNABLE TO START SERVER", err);
    }
    console.log(`SERVER RUNNING ON http://localhost:${process.env.PORT || 5000}`);
})