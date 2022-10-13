const db = require('../model')

class Room {
  async create(req, res) {
    await db.database.room.create({
      nama: req.body.nama,
    })
    res.status(200).send({ message: 'Room was registered successfully!' })
  }
  async findAll(req, res) {
    const data = await db.database.room.findAll()
    res.status(200).send({ data: data, message: 'Room was get successfully!' })
  }
  async findOne(req, res) {
    const data = await db.database.room.findOne({
      where: {
        id: req.params.id,
      },
    })
    res.send({ data: data, message: 'Room was get successfully!' })
  }
}
module.exports = new Room()
