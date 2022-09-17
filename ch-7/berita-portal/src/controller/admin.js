const db = require('../model/index')
const slug = require('slug')
const nodemailer = require('nodemailer')
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

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.elasticemail.com',
        port: 2525,
        auth: {
          user: 'badrussholehaxel@gmail.com',
          pass: '11F49F02BBEB06CE1344D1CF3BE985C8E45A',
        },
      })

      // send mail with defined transport object

      await db.database.artikel.create({
        title: data.judul,
        slug: slug(data.judul),
        artikel: data.content,
        id_category: data.kategori,
      })
      await transporter.sendMail({
        from: 'badrussholehaxel@gmail.com', // sender address
        to: 'badruskeren@gmail.com', // list of receivers
        // cc: 'badruskeren@gmail.com, iqbaltamalaka01@gmail.com, isamention@gmail.com, dimasaldio@gmail.com, arifirfan06@gmail.com, ladysamruu@gmail.com, aviddien@gmail.com, abiamrans@gmail.com, xokanggorox@gmail.com',
        subject: 'Ini Email Dari System', // Subject line
        text: data.judul, // plain text body
      })

      return res.redirect('/')
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new Admin()
