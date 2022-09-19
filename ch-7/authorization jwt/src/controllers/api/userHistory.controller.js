const { getUserVerified } = require('./../../utils/jtwToken.utils')

const model = require('./../../models/index')

const userHistory = model.database.user_game_history

const { responseSuccess, responseError } = require('../../utils/responseFormatter.utils')

module.exports = {
    storeHistory: async (req, res) => {
        const { userChoice, comChoice, result, playingAt } = req.body

        const token = req.header.authorization
        const verify = getUserVerified(token)

        if (!verify) return res.status(401).json(responseError('User Unverified'))

        if (!req.body) res.status(401).json(responseError('Missing parameters'))

        try {
            const history = await userHistory.create({
                user_game_id: verify.id,
                user_choice: userChoice,
                com_choice: comChoice,
                result: result,
                playing_at: playingAt
            })

            res.json(responseSuccess(history, 'History successfully insert'))
        } catch (err) {
            res.status(500).json(responseError(err.message))
        }
    }
}