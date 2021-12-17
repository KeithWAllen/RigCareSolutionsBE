const userDB = require('../db/userDB')
const key = require('../_keys')

module.exports = {
  authenticate:async(data,sessionID)=>{
    //authenticate the data from router here
    if (!data.username){
      return {success:false, error:"Require Username"}
    }
    if (!data.password){
      return {success:false, error:"Require Password"}
    }
    try{
      data.password = key.encryptKey(data.password)
    }catch(ex){
      return {success:false, error:"Error Performing Encryption/Decryption"}
    }

    let userResult = await userDB.getRecord(data)
    if (userResult){
      //set session ID for user
      await userDB.updateRecord({_id:userResult._id},{sessionID:sessionID})
      return {success:true, data:userResult}
    }else{
      return {success:false, error:"Invalid User Details"}
    }
  },
  authenticateExisting:async(data)=>{
    //get user from db, compare against access type
    let type = data.type
    let _id = data.data._id
    let sessionID = data.data.sessionID

    let filter = {
      _id:_id,
      type:type,
      sessionID:sessionID
    }

    let userResult = await userDB.getRecord(filter)
    if (userResult){
      return {success:true}
    }
    
    return {success:false,error:'Invalid Authentication'}
  }
}
