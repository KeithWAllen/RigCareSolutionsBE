const mongoose = require('mongoose');

const config = require('../config')
const environment = process.env.NODE_ENV || 'development'
// Connection URI
const uri = config[environment].mongoConnect;

const seedAdmin = require('./seedAdmin')
const seedTestUser = require('./seedTestUser')

module.exports = async ()=>{
  try {
    // Connect the client to the server
    await mongoose.connect(uri);
    // Establish and verify connection
    let database = mongoose.connection.db
    var admin = new mongoose.mongo.Admin(mongoose.connection.db);
    admin.buildInfo(function (err, info) {
       console.log(info.version);
    });

    //reset and insert admin script
    await database.collection('users').remove()
    await database.collection('users').insert(seedAdmin)
    await database.collection('users').insert(seedTestUser)

  } finally {
    // Ensures that the client will close when you finish/error

  }
}
