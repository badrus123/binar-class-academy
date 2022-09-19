module.exports = {
    index: (req, res) => {
        res.render('games', {
            layout: 'games',
            user: req.user
        })
    }
}