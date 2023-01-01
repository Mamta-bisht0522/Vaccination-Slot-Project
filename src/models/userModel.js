const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    pincode: {
        type: Number,
        required: true,
        trim: true
    },
    adharNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    vaccinationStatus: {
        type: String,
        default: 'none',
        enum: ["none", "First Dose Completed", "All Completed"]
    },
    vaccinationDate: {
        type: Date,
        default: null
    }

},{timestamps: true})

module.exports = mongoose.model('User',userSchema);




