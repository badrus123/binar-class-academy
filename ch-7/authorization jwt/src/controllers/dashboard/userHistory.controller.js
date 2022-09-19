const model = require('./../../models/index')

const userGameBiodata = model.database.user_game_biodata
const userGameHistory = model.database.user_game_history
module.exports = {
    index: async (req, res) => {
        const id = req.params.id

        try {
            const userHistory = await userGameHistory.findAll({
                where: { user_game_id: id },
                include: {
                    model: userGameBiodata,
                    as: 'user_game_biodata',
                    attributes: ['name'],
                    required: true
                }
            })


            res.render('dashboard/user/history', {
                layout: 'layouts/_dashboard-layout',
                user: req.user,
                userHistory: userHistory
            })
        } catch (err) {
            console.log(err)
            res.send(err)
        }
    }
}