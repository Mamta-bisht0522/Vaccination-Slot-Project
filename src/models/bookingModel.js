

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {type: String, required: true},
    pincode: {type: Number, required: true},
    vaccineCenter: {type: String, required: true},
    timeSlot: {type: String, enum: ["10:00AM-10:30AM","10:30AM-11:00AM","11:00AM-11:30AM","11:30AM-12:00PM","01:00PM-01:30PM","01:30PM-02:00PM","02:00PM-02:30PM","02:30PM-03:00PM","03:00PM-03:30PM","03:30PM-04:00PM"]},
    message: {type: mongoose.Schema.Types.Mixed},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {type: String, enum: ['pending','completed'], default: 'pending'}
})

module.exports = mongoose.model('Booking',bookingSchema);