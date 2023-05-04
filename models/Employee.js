const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        ref: "user",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    avatar: {
        type: String,
    },
    mobile: {
        type: String,
    },
    address: {
        type: String,
    },
    education: [
        {
            name: {
                type: String,
                required: true
            },
            year: {
                type: Date,
                required: true
            },
            college: {
                type: String
            },
        }
    ],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        enum:["artist","employee"],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("employee", employeeSchema)
// faker.js
// fullcalender
// error boundaries
// date fns