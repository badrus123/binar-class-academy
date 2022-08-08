const logger = (req, res, next) => {
  console.log(`LOG : ${Date.now()} ${req.method} ${req.url}`)
  next()
}

module.exports = logger
