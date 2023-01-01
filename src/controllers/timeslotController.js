const timeSlotSchema=require('../models/timeslotModel')
const validator = require('../validator/validator')

const createVaccineSlot = async (req, res) => {
    try {
        let data = req.body
        let {date, vaccineCenter, totalVaccineAvailable, timeSlots, pincode, ...rest} = data

        if (!validator.checkInput(data)) return res.status(400).send({ status: false, message: "Body cannot be empty, please provide mandatory fields, i.e. date, totalVaccineAvailable, timeSlots, pincode, vaccineCenter" });
        if (validator.checkInput(rest)) return res.status(400).send({ status: false, message: "this field accepts only date, totalVaccineAvailable, timeSlots, pincode" }) 

        if (!validator.isValidInput(date)) return res.status(400).send({status: false, message: "Please Enter Date"})
        if (!validator.isValidDate(date)) return res.status(400).send({ status: false, message: "Date should be in YYYY-MM-DD format" })

        if (typeof pincode != 'number') return res.status(400).send({status: false, message: "pincode must be Number"})
        if (!validator.isValidPin(pincode)) return res.status(400).send({status: false, message: "INVALID INPUT... please provide a valid pincode"})

        if (!validator.isValidInput(vaccineCenter)) return res.status(400).send({status: false, message: "Please enter vaccineCenter"})
   if (!validator.isValidName(vaccineCenter)) return res.status(400).send({status: false, message: "Please provide a valid city"})

        if (typeof totalVaccineAvailable != 'number') return res.status(400).send({status: false, message: "This field accepts only Number"})
        if (!validator.isValidNum(totalVaccineAvailable)) return res.status(400).send({status: false, message: "Please enter a valid number"})

        
       
        let vaccineData = await timeSlotSchema.create(data)
        return res.status(201).send({status: true, message: "successful", data: vaccineData})


    } catch (error) {
        if (error._message=="Timeslot validation failed") {
            return res.status(400).send({ status: false, message: error.message })
        }else{
            return res.status(500).send({ status: false, message: error.message })
        }
        
    }
 }

module.exports = {createVaccineSlot}




// const timeSlot=async function(req,res){
//     let data=req.body
//     let slot=await timeslotModel.create(data)
//     return res.status(201).send({status:true,msg:"successfull",data:slot})
// }

// module.exports={timeSlot}