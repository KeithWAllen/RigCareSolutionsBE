//express server
const express = require('express')
const app = express()
const cors = require('cors')
//config files
const config = require('./config')
const environment = process.env.NODE_ENV || 'development'
const loginRouter = require('./routers/loginRouter')
const session = require('express-session')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const dbConnect = require('./db_tools/dbConnection')

app.use(cors())

app.use(session({
  genid: (req) => {
    // console.log('Inside the session middleware')
    // console.log(req.sessionID)
    return Math.random() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  httpOnly:false,
  cookie: {
    secure: false
  }
}))

app.get('/', function (req, res) {
  console.log(req.session)
  req.session.cookie.test = 5;
  req.session.save();
  console.log(req.session)
  res.end(`hello world, your ID is ${req.sessionID}`)
})

app.get('/session', function (req, res) {
  console.log(req.session)
  res.send(`your ID is still ${req.session.id}`)
})

app.get('/ping', function (req, res) {
  console.log("PING!")
  res.send('hello world')
})

app.use('/user',jsonParser,loginRouter)

app.listen(config[environment].port, () => console.log(`Listening on port ${config[environment].port}!`))

dbConnect()
