const bcrypt = require('bcrypt')

const model = require('./../models/index')

const userGame = model.database.user_game
const userGameBiodata = model.database.user_game_biodata

const { generateToken } = require('../utils/jtwToken.utils')

module.exports = {
    login: (req, res) => {
        res.render('login', {
            layout: 'layouts/_main-layout',
            title: 'User Login',
            message: {
                msgType: req.flash('msgType'),
                msg: req.flash('msg')
            }
        })
    },
    signup: (req, res) => {
        res.render('signup', {
            layout: 'layouts/_main-layout',
            title: 'User Register',
            message: {
                msgType: req.flash('msgType'),
                msg: req.flash('msg')
            }
        })
    },
    register: async (req, res) => {
        const { name, username, password, password_confirmation } = req.body

        try {
            const userRegistered = await userGame.findOne({ where: { username } })

            if (userRegistered) {
                req.flash('msg', `Username already exist`)
                res.redirect('/sign-up')
            } else {
                if (password !== password_confirmation) {
                    req.flash('msg', `Password doesn't match`)
                    res.redirect('/sign-up')
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password, salt)

                    try {
                        await model.transaction(async (transaction) => {
                            const user = await userGame.create({
                                username,
                                role: 'player',
                                password: hashedPassword
                            }, { transaction })

                            await userGameBiodata.create({
                                user_game_id: user.id,
                                name: name
                            }, { transaction })
                        })

                        req.flash('msgType', 'success')
                        req.flash('msg', 'Register Successfully')

                        res.redirect('/login')
                    } catch (error) {
                        req.flash('msgType', 'danger')
                        req.flash('msg', 'Register Failed')

                        res.redirect('/sign-up')
                    }
                }
            }
        } catch {
            req.flash('msgType', 'danger')
            req.flash('msg', 'Register Failed')

            res.redirect('/sign-up')

        }

    },
    setting: (req, res) => {
        res.render('setting', {
            layout: 'layouts/_main-layout',
            title: 'User Setting',
            user: req.user,
            message: {
                msgType: req.flash('msgType'),
                msg: req.flash('msg')
            }
        })
    },
    updateUser: async (req, res) => {
        const { id, name, password } = req.body

        try {
            const user = await userGame.findOne({ where: { id } })

            let newPassword = user.password

            let role = user.role

            if (password != '') {
                const salt = await bcrypt.genSalt(10)
                newPassword = await bcrypt.hash(password, salt)
            }

            await model.transaction(async (transaction) => {
                await userGame.update({
                    role,
                    password: newPassword
                }, { where: { id }, transaction })

                await userGameBiodata.update({ name }, { where: { user_game_id: id }, transaction })
            })

            const token = await generateToken(id)

            req.header.authorization = token

            res.redirect('/')
        } catch (err) {
            req.flash('msgType', 'danger')
            req.flash('msg', 'Update failed')

            res.redirect('/setting')
        }

    },
    deleteUser: async (req, res) => {
        const { id } = req.body

        try {
            await model.transaction(async (transaction) => {
                await userGame.destroy({ where: { id } })
                await userGameBiodata.destroy({ where: { user_game_id: id } })
            })

            delete req.header.authorization

            req.session.destroy()
            res.redirect('/')
        } catch (err) {
            req.flash('msgType', 'danger')
            req.flash('msg', 'Update failed')

            res.redirect('/setting')
        }
    }
}