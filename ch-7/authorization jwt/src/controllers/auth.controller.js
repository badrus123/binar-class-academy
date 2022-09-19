const bcrypt = require('bcrypt')

const model = require('./../models/index')

const userGame = model.database.user_game

const { generateToken } = require('./../utils/jtwToken.utils')

module.exports = {
    auth: async (req, res) => {
        const { username, password } = req.body

        try {
            const user = await userGame.findOne({ where: { username } })

            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = await generateToken(user.id)

                req.header.authorization = token

                res.redirect('/')
            } else {
                req.flash('msgType', 'danger')
                req.flash('msg', 'Incorrect password')
                res.redirect('/login')
            }
        } catch (err) {
            req.flash('msgType', 'danger')
            req.flash('msg', 'Username not found')
            res.redirect('/login')
        }
    },
    logout: (req, res) => {
        delete req.header.authorization

        req.session.destroy()
        res.redirect('/')
    },
}