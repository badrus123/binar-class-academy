const bcrypt = require('bcrypt')

const model = require('./../../models/index')

const userGame = model.database.user_game
const userGameBiodata = model.database.user_game_biodata

const { generateToken } = require('./../../utils/jtwToken.utils')

module.exports = {
    index: async (req, res) => {
        try {
            const users = await userGame.findAll({
                include: {
                    model: userGameBiodata,
                    as: 'user_game_biodata',
                    attributes: ['name'],
                    required: true
                }
            })

            res.render('dashboard/user/index', {
                layout: 'layouts/_dashboard-layout',
                users: users,
                user: req.user,
                message: {
                    msgType: req.flash('msgType'),
                    msg: req.flash('msg')
                }
            })
        } catch (err) {
            res.send(err.message)
        }
    },
    create: async (req, res) => {
        res.render('dashboard/user/create', {
            layout: 'layouts/_dashboard-layout',
        })
    },
    store: async (req, res) => {
        const { username, name, role, password, passwordConfirmation } = req.body

        try {
            const userRegistered = await userGame.findOne({ where: { username } })

            if (userRegistered) {
                req.flash('msgType', 'danger')
                req.flash('msg', 'Username already exist')
                res.redirect('/dashboard/user')
            } else {
                if (password !== passwordConfirmation) {
                    req.flash('msgType', 'danger')
                    req.flash('msg', 'Password is doesn\'t match')
                    res.redirect('/dashboard/user')
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password, salt)

                    try {
                        await model.transaction(async (transaction) => {
                            const user = await userGame.create({
                                username,
                                role,
                                password: hashedPassword
                            }, { transaction })

                            await userGameBiodata.create({
                                user_game_id: user.id,
                                name: name
                            }, { transaction })
                        })

                        req.flash('msgType', 'success')
                        req.flash('msg', 'Add new user success')
                        res.redirect('/dashboard/user')
                    } catch (err) {
                        req.flash('msgType', 'danger')
                        req.flash('msg', 'Error occured while creating user')
                        res.redirect('/dashboard/user')
                    }
                }
            }
        } catch (err) {
            req.flash('msgType', 'danger')
            req.flash('msg', 'Error occured while creating user')
            res.redirect('/dashboard/user')
        }

    },
    edit: async (req, res) => {
        const user = await userGame.findOne({
            where: { id: req.params.id },
            include: {
                model: userGameBiodata,
                as: 'user_game_biodata',
                attributes: ['name'],
                required: true
            }
        })

        res.render('dashboard/user/edit', {
            layout: 'layouts/_dashboard-layout',
            message: {
                msgType: req.flash('msgType'),
                msg: req.flash('msg')
            },
            user
        })
    },
    update: async (req, res) => {
        const { id, name, role, password, passwordConfirmation } = req.body

        try {
            const user = await userGame.findOne({ where: { id } })

            let hashedPassword = user.password

            if (password != '') {
                const salt = await bcrypt.genSalt(10)
                hashedPassword = await bcrypt.hash(password, salt)
            }

            if (password !== passwordConfirmation) {
                req.flash('msgType', 'danger')
                req.flash('msg', 'Password is doesn\'t match')
                res.redirect(`/dashboard/user/edit/${id}`)
            } else {
                try {
                    await model.transaction(async (transaction) => {
                        await userGame.update({
                            role,
                            password: hashedPassword
                        }, { where: { id }, transaction })

                        await userGameBiodata.update({
                            user_game_id: user.id,
                            name: name
                        }, { where: { user_game_id: id }, transaction })
                    })

                    const token = await generateToken(id)

                    req.header.authorization = token

                    req.flash('msgType', 'success')
                    req.flash('msg', 'User has been updated Successfully')
                    res.redirect(`/dashboard/user`)
                } catch (err) {
                    req.flash('msgType', 'danger')
                    req.flash('msg', 'Error occured while updating user')
                    res.redirect(`/dashboard/user/edit/${id}`)
                }
            }
        } catch (err) {
            req.flash('msgType', 'danger')
            req.flash('msg', 'Error occured while updating user')
            res.redirect(`/dashboard/user/edit/${id}`)
        }
    },
    delete: async (req, res) => {
        const { id } = req.body

        try {
            const user = await userGame.findOne({ where: { id } })

            if (user) {
                try {
                    await model.transaction(async (transaction) => {
                        await userGame.destroy({ where: { id }, transaction })
                        await userGameBiodata.destroy({ where: { user_game_id: id }, transaction })
                    })

                    req.flash('msgType', 'success')
                    req.flash('msg', 'Delete User Success')
                } catch (err) {
                    req.flash('msgType', 'danger')
                    req.flash('msg', 'Error occured while deleting user')
                }
            } else {
                req.flash('msgType', 'danger')
                req.flash('msg', 'User not found')
            }

            res.redirect('/dashboard/user')
        } catch (err) {
            req.flash('msgType', 'danger')
            req.flash('msg', 'Error occured while deleting user')
            res.redirect('/dashboard/user')
        }

    }
}