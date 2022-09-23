class Game {
  constructor() {
    this.game = [
      {
        id: '1',
        name: 'batu',
        image: 'batu.png',
      },
      {
        id: '2',
        name: 'kertas',
        image: 'kertas.png',
      },
      {
        id: '3',
        name: 'gunting',
        image: 'gunting.png',
      },
    ]
    this.clicked = ''
    this.comClicked = ''
    this.comName = ''
  }
  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
  }
  randomPick(gameArr) {
    let timeleft = 3
    let downloadTimer = setInterval(function () {
      timeleft -= 1
      this.comClicked = `com-${gameArr[timeleft].name}-${gameArr[timeleft].id}`
      const elem = document.getElementById(this.comClicked)
      elem.classList.add('click-player-content')
      elem.classList.remove('default-content')
      setTimeout(() => {
        elem.classList.add('default-content')
        elem.classList.remove('click-player-content')
      }, 1000)
      if (timeleft <= 0) {
        clearInterval(downloadTimer)
      }
    }, 1000)
  }
  winner(message) {
    const elemCom = document.getElementById('versus')
    elemCom.classList.add('div-vs')
    console.log('player game', message)

    if (message[0].picker !== null && message[1].picker !== null) {
      if (message[0].picker === message[1].picker) {
        elemCom.innerHTML = 'DRAW'
      } else {
        if (message[0].picker === 'batu') {
          if (message[1].picker === 'gunting') {
            elemCom.innerHTML = `${message[0].username} WIN`
          } else {
            elemCom.innerHTML = `${message[1].username} WIN`
          }
        } else if (message[0].picker === 'gunting') {
          if (message[1].picker === 'kertas') {
            elemCom.innerHTML = `${message[0].username} WIN`
          } else {
            elemCom.innerHTML = `${message[1].username} WIN`
          }
        } else if (message[0].picker === 'kertas') {
          if (message[1].picker === 'batu') {
            elemCom.innerHTML = `${message[0].username} WIN`
          } else {
            elemCom.innerHTML = `${message[1].username} WIN`
          }
        }
      }
    }
  }
  handleClick(id, name, username, room) {
    this.clicked = id
    const elem = document.getElementById(id)
    elem.classList.add('click-player-content')
    elem.classList.remove('default-content')
    socket.emit('playerPicker', { username: username, pick: name, room: room })
    // this.randomPick(this.game)
    // setTimeout(() => {
    //   const indexCom = this.getRandomInt(0, 3)
    //   this.comClicked = `com-${this.game[indexCom].name}-${this.game[indexCom].id}`
    //   this.comName = this.game[indexCom].name
    //   const elemCom = document.getElementById(this.comClicked)
    //   elemCom.classList.add('click-player-content')
    //   elemCom.classList.remove('default-content')
    //   this.winner(name, this.comName)
    // }, 5000)
  }
  static refresh() {
    document.location.reload()
  }
  play() {
    let player = `<h1>${username}</h1>`
    for (let i = 0; i < this.game.length; i++) {
      player += `<div id="player-${this.game[i].name}-${this.game[i].id}" class="default-content" onclick="gaming.handleClick('player-${this.game[i].name}-${this.game[i].id}','${this.game[i].name}','${username}','${room}')"><img src="/assets/${this.game[i].image}" alt="${this.game[i].name}" class="image-game"></div>`
    }

    socket.on('dataPick', (message) => {
      this.winner(message)
    })
    let com = `<h1>${lawan === 'waiting' ? 'Waiting ...' : lawan}</h1>`
    for (let i = 0; i < this.game.length; i++) {
      com += `<div id="com-${this.game[i].name}-${this.game[i].id}" class="default-content"><img src="/assets/${this.game[i].image}" alt="${this.game[i].name}" class="image-game"></div>`
    }
    document.getElementById('player-content').innerHTML = player
    document.getElementById('com-content').innerHTML = com
  }
}
const gaming = new Game()
gaming.play()
