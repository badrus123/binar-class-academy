const game = [
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
let clicked = ''
let comClicked = ''
let comName = ''
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}
function randomPick() {
  let timeleft = 3
  let downloadTimer = setInterval(function () {
    timeleft -= 1
    comClicked = `com-${game[timeleft].name}-${game[timeleft].id}`
    const elem = document.getElementById(comClicked)
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
function winner(player, computer) {
  const elemCom = document.getElementById('versus')
  elemCom.classList.add('div-vs')
  if (player === computer) {
    elemCom.innerHTML = '<h3 class="text-result">DRAW</h3>'
  } else {
    if (player === 'batu') {
      if (computer === 'gunting') {
        elemCom.innerHTML = '<h3 class="text-result">You Win</h3>'
      } else {
        elemCom.innerHTML = '<h3 class="text-result">You Lose</h3>'
      }
    } else if (player === 'kertas') {
      if (computer === 'batu') {
        elemCom.innerHTML = '<h3 class="text-result">You Win</h3>'
      } else {
        elemCom.innerHTML = '<h3 class="text-result">You Lose</h3>'
      }
    } else if (player === 'gunting') {
      if (computer === 'kertas') {
        elemCom.innerHTML = '<h3 class="text-result">You Win</h3>'
      } else {
        elemCom.innerHTML = '<h3 class="text-result">You Lose</h3>'
      }
    }
  }
}
function handleClick(id, name) {
  clicked = id
  const elem = document.getElementById(id)
  elem.classList.add('click-player-content')
  elem.classList.remove('default-content')
  randomPick()
  setTimeout(() => {
    const indexCom = getRandomInt(0, 3)
    comClicked = `com-${game[indexCom].name}-${game[indexCom].id}`
    comName = game[indexCom].name
    const elemCom = document.getElementById(comClicked)
    elemCom.classList.add('click-player-content')
    elemCom.classList.remove('default-content')
    winner(name, comName)
  }, 5000)
}
function refresh() {
  document.location.reload()
}
let player = '<h1>PLAYER 1</h1>'
for (let i = 0; i < game.length; i++) {
  player += `<div id="player-${game[i].name}-${game[i].id}" class="default-content" onclick="handleClick('player-${game[i].name}-${game[i].id}','${game[i].name}')"><img src="./assets/${game[i].image}" alt="${game[i].name}" class="image-game"></div>`
}
let com = '<h1>COM</h1>'
for (let i = 0; i < game.length; i++) {
  com += `<div id="com-${game[i].name}-${game[i].id}" class="default-content"><img src="./assets/${game[i].image}" alt="${game[i].name}" class="image-game"></div>`
}
document.getElementById('player-content').innerHTML = player
document.getElementById('com-content').innerHTML = com
