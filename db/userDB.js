const model = require('../models/users')

module.exports = {
  getRecord:async(data)=>{
    let record = await model.findOne(data,{password:0})
    return record
  }
}
