const db = require('../model/index')
class Attendance {
  async in(req, res) {
    try {
      const body = req.body
      const attendance = await db.database.attendance.create({
        time_in: new Date(),
        id_user: body.id_user,
      })
      res.json({ message: 'create success', data: attendance })
    } catch (error) {
      res.json({ message: 'create failed', error })
    }
  }
  async out(req, res) {
    const attendance = await db.database.attendance.findOne({
      where: {
        id: req.params.id,
      },
    })
    attendance.time_out = new Date()
    await attendance.save()
    res.json({ message: 'update success', data: attendance })
  }
  async findAll(req, res) {
    const attendance = await db.database.attendance.findAll({
      include: [
        { model: db.database.user, as: 'user', include: ['sekolah', 'role'] },
      ],
    })
    res.json({ message: 'get success', data: attendance })
  }
}
module.exports = new Attendance()
