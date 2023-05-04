const mongoose = require("mongoose")

const appointment = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    artistId: {
        type: mongoose.Types.ObjectId,
        ref: "employee",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirm", "reject", "complete"],
        default: "pending"
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("appointment", appointment)