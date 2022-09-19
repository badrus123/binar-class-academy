const bcrypt = require('bcrypt')

const model = require('./../../models/index')

const userGame = model.database.user_game
const userGameBiodata = model.database.user_game_biodata

const {
  responseSuccess,
  responseError,
} = require('../../utils/responseFormatter.utils')
const { generateToken } = require('../../utils/jtwToken.utils')

module.exports = {
  index: async (req, res) => {
    if (Object.keys(req.body) == 0) {
      try {
        const users = await userGame.findAll({
          include: {
            model: userGameBiodata,
            as: 'user_game_biodata',
            attributes: ['name'],
            required: true,
          },
        })

        res.status(200).json(responseSuccess(users))
      } catch (err) {
        res
          .status(500)
          .json(
            responseError(err.message || 'Error occured while getting users'),
          )
      }
    } else {
      try {
        const { id } = req.body

        const user = await userGame.findOne({ where: { id } })

        if (!user) {
          res.status(404).json(responseError('User not found'))
        } else {
          res.status(200).json(responseSuccess(user))
        }
      } catch (err) {
        res
          .status(500)
          .json(
            responseError(err.message || 'Error occured while getting users'),
          )
      }
    }
  },
  store: async (req, res) => {
    if (!req.body) res.status(400).json(responseError('Missing Body'))

    const { name, username, role, password, passwordConfirmation } = req.body

    const userRegistered = await userGame.findOne({ where: { username } })

    if (userRegistered) {
      res.status(400).json(responseError('Username already exist'))
    } else {
      if (password !== passwordConfirmation) {
        res.status(400).json(responseError("Password is doesn't match"))
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        try {
          const result = await model.transaction(async (transaction) => {
            const user = await userGame.create(
              {
                username,
                role,
                password: hashedPassword,
              },
              { transaction },
            )

            await userGameBiodata.create(
              {
                user_game_id: user.id,
                name: name,
              },
              { transaction },
            )

            return user
          })

          const getUser = await userGame.findAll({
            where: { id: result.id },
            include: {
              model: userGameBiodata,
              as: 'user_game_biodata',
              attributes: ['name'],
              required: true,
            },
          })

          res
            .status(200)
            .json(responseSuccess(getUser, 'User stored successfully'))
        } catch (err) {
          console.log(err)
          res
            .status(500)
            .send(
              responseError(err.message || 'Error occured while creating user'),
            )
        }
      }
    }
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
        res
          .status(400)
          .json(responseError("Password doesn't match Confirmation"))
      } else {
        try {
          await model.transaction(async (transaction) => {
            await userGame.update(
              {
                role,
                password: hashedPassword,
              },
              { where: { id }, transaction },
            )

            await userGameBiodata.update(
              { name: name },
              { where: { user_game_id: id }, transaction },
            )
          })

          const getUser = await userGame.findAll({
            where: { id },
            include: {
              model: userGameBiodata,
              as: 'user_game_biodata',
              attributes: ['name'],
              required: true,
            },
          })

          res
            .status(200)
            .json(responseSuccess(getUser, 'User updated successfully'))
        } catch (err) {
          console.error(err)
          res
            .status(500)
            .json(responseError('Error occured while updating user'))
        }
      }
    } catch {
      res.status(400).json(responseError("User doesn't exist"))
    }
  },
  delete: async (req, res) => {
    const { id } = req.body

    const user = await userGame.findOne({ where: { id } })

    if (user) {
      try {
        await model.transaction(async () => {
          await userGame.destroy({ where: { id } })
          await userGameBiodata.destroy({ where: { user_game_id: id } })
        })

        res
          .status(200)
          .json(responseSuccess({ id }, 'User deleted successfully'))
      } catch (err) {
        res
          .status(500)
          .json(responseError(err || 'Error occured while deleting user'))
      }
    } else {
      res.status(404).json(responseError('User not found'))
    }
  },
  profile: async (req, res) => {
    const user = await userGame.findOne({ where: { id: req.user.id } })
    return res.status(200).json(responseSuccess(req.user))
  },
  login: async (req, res) => {
    const { username, password } = req.body
    try {
      const user = await userGame.findOne({ where: { username } })

      const match = await bcrypt.compare(password, user.password)
      if (match) {
        const token = await generateToken(user.id)
        res.status(200).json(responseSuccess({ token }))
      }
    } catch (err) {
      console.log(err)
      res.status(400).json(responseError('Username or Password is wrong'))
    }
  },
}
