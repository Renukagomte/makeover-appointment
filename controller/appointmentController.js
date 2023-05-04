const asyncHandler = require('express-async-handler')
const Appointment = require('../models/Appointment')
const { format, compareAsc } = require("date-fns")
exports.bookingAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment.create({
        ...req.body,
        bookingDate: new Date(`${req.body.date} ${req.body.time}`)
    })
    res.json({ message: "Booking Success", result })
})

exports.getAppointments = asyncHandler(async (req, res) => {
    const result = await Appointment.find()
        .populate("userId", "name mobile")
        .populate("artistId", "name")
        .sort({createdAt: -1})

    const resultData = []
    result.forEach(item => {
        resultData.push({
            _id: item._id,
            name: item.userId.name,
            artist: item.artistId.name,
            status: item.status,
            date: format(new Date(item.bookingDate), "dd/MM/yyyy"),
            time: format(new Date(item.bookingDate), "hh:mm"),
            isActive: compareAsc(new Date(), item.bookingDate) === -1 ? true : false
        })
    })
    res.json({
        message: "Booking fetch",
        result: resultData
    })

})

exports.getSingleAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment.findOne({ _id: req.params.aid })
    res.json({ message: "Booking single fetch", result })
})


exports.destroyAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment.deleteMany()
    res.json({ message: "Booking destroy success", result })
})


exports.deleteAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment.findByIdAndDelete(req.params.id)
    res.json({ message: "Booking delete success" })
})


exports.artistAppointment = asyncHandler(async (req, res) => {
    const { doctorId } = req.params
    const result = await Appointment.find({ doctorId })
    res.json({ message: "artist fetch success", result })
})


exports.userAppointment = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const result = await Appointment.find({ userId })
    res.json({ message: "user fetch success", result })
})