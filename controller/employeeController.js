const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Employee = require('../models/Employee')
const Appointment = require('../models/Appointment')
const { format } = require('date-fns')

exports.registerEmployee = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const found = await Employee.findOne({ email })
    if (found) {
        return res.status(400).json({ message: "email already exist" })
    }

    const hashPass = bcrypt.hashSync(password, 10)


    const result = await Employee.create({ ...req.body, password: hashPass })
    res.json({ message: "employee register success" })
})


exports.getEmployees = asyncHandler(async (req, res) => {
    const result = await Employee.find()
    res.json({
        message: "employee fetch success",
        result
    })
})


exports.getartists = asyncHandler(async (req, res) => {
    const result = await Employee.find({
        role: "artist"
    }).select("name category")
    res.json({
        message: "artist fetch success",
        result
    })
})


exports.getSingleEmployee = asyncHandler(async (req, res) => {
    const result = await Employee.findOne({ _id: req.params.eid })
    res.json({ message: "single employee fetch success", result })
})


exports.destroyEmployee = asyncHandler(async (req, res) => {
    const result = await Employee.deleteMany()
    res.json({ message: "single employee fetch success", result })
})


exports.employeeLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const found = await Employee.findOne({ email })
    if (!found) {
        return res.status(400).json({ message: "Email Not found" })
    }
    const verify = bcrypt.compareSync(password, found.password)
    if (!verify) {
        return res.status(400).json({ message: "Invalid password" })
    }
    const token = jwt.sign({ id: found._id, role: found.role }, process.env.JWT_KEY)
    res.cookie("token", token)

    res.json({
        message: "user login success",
        result: {
            id: found._id,
            name: found.name,
            email: found.email,
            role: found.role
        }
    })
})


exports.getBookings = asyncHandler(async (req, res) => {
    if (!req.body.artistId) {
        return res.status(401).json({
            message: "Unauthorize. Artist Only Route"
        })
    }
    const result = await Appointment
        .find({ artistId: req.body.artistId })
        .populate("userId", "name")
    const events = result.map(item => {
        return {
            title: item.comment || item.userId,
            date: format(new Date(item.bookingDate), "yyyy-MM-dd")
        }
    })
    const today = result.filter(item => {
        if (format(new Date(item.bookingDate), "dd") === format(new Date(), "dd")) {
            return item
        }
    })
    res.json({
        message: "fetch artist appointments success",
        result: {
            events,
            todayBookings: today
        }
    })
})