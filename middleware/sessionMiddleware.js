module.exports = {
  sessionMiddleware:(req,res,next)=>{
    if (req.body && req.body.data && req.body.data.sessionID){
      next()
      return
    }
    throw 'Invalid Session ID'
  }
}
