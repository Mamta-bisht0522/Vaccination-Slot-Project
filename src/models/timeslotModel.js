const mongoose=require('mongoose')
const timeSlotSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    vaccineCenter: {
        type: String,
        required: true,
    },
    totalVaccineAvailable: {
        type: Number,
        required: true
    },
    timeSlots: {
        "10:00AM-10:30AM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        "10:30AM-11:00AM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        "11:00AM-11:30AM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        "11:30AM-12:00PM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        "01:00PM-01:30PM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        "01:30PM-02:00PM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        "02:00PM-02:30PM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        "02:30PM-03:00PM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        "03:00PM-03:30PM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        "03:30PM-04:00PM": {type: String, enum: ["Available", "Unavailable"], default: "Available"},
        _id: false
    }
    
})

module.exports = mongoose.model('TimeSlot', timeSlotSchema)
