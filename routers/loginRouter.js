const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/authenticate',async(req,res)=>{
  let authenticateResult = await userController.authenticate(req.body)
  console.log(authenticateResult)
  if (authenticateResult.success){
    res.json({success:true,data:authenticateResult.data}).status(200)
  }else{
    res.json({success:false,error:authenticateResult.error}).status(400)
  }
})

module.exports = router
