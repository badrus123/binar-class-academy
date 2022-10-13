const db = require('../model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class User {
  async register(req, res) {
    const hashPass = await bcrypt.hash(req.body.password, 10)
    await db.database.user.create({
      email: req.body.email,
      password: hashPass,
      nama: req.body.nama,
    })
    res.status(200).send({ message: 'User was registered successfully!' })
  }
  async login(req, res) {
    const user = await db.database.user.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }
    const passwordIsValid = await bcrypt.compareSync(
      req.body.password,
      user.password,
    )
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      })
    }
    const token = jwt.sign({ id: user.id }, 'gameres', {
      expiresIn: 86400, // 24 hours
    })
    res.status(200).send({
      id: user.id,
      email: user.email,
      nama: user.nama,
      accessToken: token,
    })
  }
}
module.exports = new User()
