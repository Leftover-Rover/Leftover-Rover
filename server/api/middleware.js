const isUser = (req, res, next) => {
  if (!req.user) {
    res.status(403)
    return next(new Error('Access denied'))
  }
  next()
}

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403)
    return next(new Error('Access denied'))
  }
  next()
}

module.exports = { isUser, isAdmin }
