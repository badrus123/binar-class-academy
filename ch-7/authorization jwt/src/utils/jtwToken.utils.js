const jwt = require('jsonwebtoken')

const model = require('./../models/index')

const userGame = model.database.user_game
const userGameBiodata = model.database.user_game_biodata

module.exports = {
    generateToken: async (id) => {
        const user = await userGame.findOne({
            where: { id },
            include: {
                model: userGameBiodata,
                as: 'user_game_biodata',
                attributes: ['name'],
                required: true
            }
        })

        const token = jwt.sign(
            {
                id: user.id,
                name: user.user_game_biodata.name,
                role: user.role,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        )

        return token;
    },
    getUserVerified: (token) => {
        if (token) {
            try {
                verify = jwt.verify(token, process.env.JWT_SECRET)
                return verify
            } catch (err) {
                return false
            }
        }

        return false

    }
}
