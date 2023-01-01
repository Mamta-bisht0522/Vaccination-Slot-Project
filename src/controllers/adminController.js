const adminModel = require('../models/adminModel')
const userModel = require('../models/userModel')
const validator = require('../validator/validator')


const loginAdmin = async (req, res) => {
    try {
        let data = req.body
        let {phoneNumber, password, ...rest} = data

        if (!validator.checkInput(data)) return res.status(400).send({ status: false, message: "Please provide phoneNumber and password to login" });
        if (validator.checkInput(rest)) return res.status(400).send({ status: false, message: "this field accepts only phoneNumber and password" }) 

        if (!validator.isValidInput(phoneNumber)) return res.status(400).send({ status: false, message: "Please enter phoneNumber" })
        if (!validator.isValidMobileNumber(phoneNumber)) return res.status(400).send({ status: false, message: "INVALID INPUT... please provide a valid phoneNumber" })

        if (!validator.isValidInput(password)) return res.status(400).send({ status: false, message: "Please enter password" })
        if (!validator.isValidpassword(password)) return res.status(400).send({status: false, message: "Invalid Password Format. password should be have minimum 8 character and max 15 character and must contains one number, one uppar alphabet, one lower alphabet and one special character"})

        let checkAdmin = await adminModel.findOne({phoneNumber: phoneNumber, password: password})
        if (!checkAdmin) return res.status(400).send({ status: false, message: "Incorrect phoneNumber or Password"})

        let token = jwt.sign({Id : checkAdmin._id, category: 'Admin'}, 'vaccination', {expiresIn: '1h'})
        if (!token) return res.status(400).send({ status: false, message: "something went wrong"})

        let obj = {Id : checkAdmin._id, token: token}
        return res.status(200).send({status: true, message: "login successfull", data: obj})


    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
} 


const getUserList = async (req, res) => {
    try {
        let data = req.query
        let {age, pincode, vaccineStatus, ...rest} = data
       
        if (validator.checkInput(rest)) return res.status(400).send({ status: false, message: "you can only filter data by using age, pincode and vaccineStatus" })

        let obj = {}

        if (age || age=='') {
            if (!validator.isValidInput(age)) return res.status(400).send({status: false, message: "please provide age"})
            age = Number(age)
            if (!age) return res.status(400).send({status: false, message: "age should be in number"})
            obj.age = age
        }
        if (pincode || pincode=='') {
            if (!validator.isValidInput(pincode)) return res.status(400).send({status: false, message: "please provide pincode"})
            age = Number(pincode)
            if (!age) return res.status(400).send({status: false, message: "age should be in number"})
            if (!validator.isValidPin(pincode)) return res.status(400).send({status: false, message: "Please enter valid pincode"})
            obj.pincode = pincode
        }
        if (vaccineStatus || vaccineStatus=='') {
            if (!["none", "First Dose Completed", "All Completed"].includes(vaccineStatus)) return res.status(400).send({status: false, message: `vaccineStatus should be only ["none", "First Dose Completed", "All Completed"]`})
            obj.vaccineStatus = vaccineStatus
        }


        let findData = await userModel.find(obj)
        if (!findData) return res.status(404).send({status: false, message: "data not found"})
        return res.status(200).send({status: true, message: "found successfully",count:findData.length, data: findData})


    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}


module.exports = {loginAdmin, getUserList}