const userDB = require('../db/userDB')

module.exports = {
  authenticate:async(data)=>{
    //authenticate the data from router here
    if (!data.username){
      return {success:false, error:"Require Username"}
    }
    if (!data.password){
      return {success:false, error:"Require Password"}
    }

    let userResult = await userDB.getRecord(data)
    if (userResult){
      return {success:true, data:userResult}
    }else{
      return {success:false, error:"Invalid User Details"}
    }
  }
}
