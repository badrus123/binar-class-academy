const db = require('../model/index')
class Auth {
  async login(req, res) {
    const result = await db.database.sekolah.findAll()
    res.json(result)
  }
}
module.exports = new Auth()
