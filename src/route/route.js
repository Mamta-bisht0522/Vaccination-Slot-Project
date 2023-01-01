const express=require('express')
const router=express.Router()

const userController=require('../controllers/userController')
const adminController=require('../controllers/adminController')
const timeSlotController=require('../controllers/timeSlotController')

router.post('/registerUser',userController.createUser)
router.post('/loginUser',userController.loginUser)
router.get('/getVccineSlot/:userId',userController.getVaccineSlot)
router.post('/slotBooking/:userId',userController.bookVaccineSlot)



 router.post('/loginAdmin',adminController.loginAdmin)
 router.get('/getUserListbyAdmin',adminController.getUserList)


router.post('/timeslot',timeSlotController.createVaccineSlot)






module.exports=router
