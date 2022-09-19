module.exports = {
  index: async (req, res) => {
    res.render('index', {
      layout: 'index',
      user: req.user,
    })
  },
}
