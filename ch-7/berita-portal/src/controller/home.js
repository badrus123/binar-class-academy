const db = require('../model/index')
class Home {
  async render(req, res) {
    try {
      const artikel = await db.database.artikel.findAll()
      res.render('index', { artikel: artikel, title: 'Berita' })
    } catch (error) {
      console.log(error)
    }
  }
  async detail(req, res) {
    try {
      const artikel = await db.database.artikel.findOne({
        where: { slug: req.params.slug },
      })
      res.render('detailBerita', {
        content: artikel.artikel,
        title: artikel.title,
        image: artikel.image,
        tanggal: artikel.created_at,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new Home()
