const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const sessionMiddleware = require('../middleware/sessionMiddleware')

//authenticates attempt to login
router.get('/',async(req,res)=>{
  console.log(req.query)
  res.json({success:true,data:null}).status(200)
})

//authenticates access to main/admin pages
router.post('/authenticateexisting',sessionMiddleware.sessionMiddleware,async(req,res)=>{
  let authenticateResult = await userController.authenticateExisting(req.body)
  if (authenticateResult.success){
    res.json({success:true,data:authenticateResult.data}).status(200)
  }else{
    res.json({success:false,error:authenticateResult.error}).status(400)
  }
})

module.exports = router
