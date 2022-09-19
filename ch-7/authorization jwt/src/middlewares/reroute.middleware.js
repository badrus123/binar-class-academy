module.exports = {
    escape404: (req, res) => {
        res.status(404)
        res.send(`<title>404 Not Found</title><img src='${process.env.BASE_URL}/images/404.png' style='position: absolute;
        top: 25%;
        left: 35%;'>`)
    }
}