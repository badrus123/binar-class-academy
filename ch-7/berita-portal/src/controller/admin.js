const db = require('../model/index')
const slug = require('slug')
class Admin {
  async render(req, res) {
    try {
      const kategori = await db.database.category.findAll()
      res.render('admin', { kategori: kategori })
    } catch (error) {
      res.render('error')
    }
  }
  async create(req, res) {
    try {
      const data = req.body
      console.log('ini body', data)
      await db.database.artikel.create({
        title: data.judul,
        slug: slug(data.judul),
        artikel: data.content,
        id_category: data.kategori,
      })
      return res.redirect('/index')
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new Admin()
