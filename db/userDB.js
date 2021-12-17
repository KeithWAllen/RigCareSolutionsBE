const model = require('../models/users')

module.exports = {
  getRecord:async(filter)=>{
    let record = await model.findOne(filter,{password:0})
    return record
  },
  updateRecord:async(filter,data)=>{
    let record = await model.updateOne(filter,data,{upsert:false})
    return record
  }
}
