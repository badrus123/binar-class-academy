const db = require('../model/index')
class Sekolah {
  async create(req, res) {
    const result = await db.database.sekolah.create({
      name: req.body.name,
      alamat: req.body.alamat,
    })
    res.json(result)
  }
  async createSiswa(req, res) {
    const result = await db.database.siswa.create({
      name: req.body.name,
      alamat: req.body.alamat,
      id_sekolah: req.body.id_sekolah,
    })
    res.json(result)
  }
  async getSiswa(req, res) {
    const result = await db.database.siswa.findAll()
    res.json(result)
  }
}
module.exports = new Sekolah()
