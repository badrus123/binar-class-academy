const axios = require('axios')
const Person = require('./segitiga')
function postDiscord() {
  let time = 1
  const person = new Person('badrus', '25')
  let upTimer = setInterval(async () => {
    time = time + 1

    const dataBody = {
      content: `<@519396341324054538> <@932664396990275644> <@822712559589130270> Laagi kelas bikin BOT di chapter 5 topic nodeJS luas segitiga ${person.luasSegitiga(
        Math.floor(Math.random() * 1 + 1),
        Math.floor(Math.random() * 2 + 1),
        Math.floor(Math.random() * 1 + 1),
      )}`,
    }

    const { data } = await axios.post(
      'https://discord.com/api/webhooks/1001240008813985844/yy2BFoFofGxB8Xbi0TrLUE1HQr4ajdCEitKrPWCElkAmFZMGpuQdRKPOdLi63sxD7AYL',
      dataBody,
    )
    if (time > 5) {
      clearInterval(upTimer)
    }
  }, 1000)
}
postDiscord()
