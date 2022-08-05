class Rambu {
  constructor(second) {
    this.second = second
  }
  changeLamp() {
    let timeleft = this.second
    let downloadTimer = setInterval(function () {
      const secondCount = document.getElementById('counter-down')
      const yellow = document.getElementById('yellow-lamp')
      const green = document.getElementById('green-lamp')
      const red = document.getElementById('red-lamp')
      yellow.classList.add('black-lamp')
      yellow.classList.remove('yellow-lamp')
      green.classList.add('black-lamp')
      green.classList.remove('yellow-lamp')
      red.classList.add('red-lamp')
      red.classList.remove('black-lamp')
      if (timeleft <= 1) {
        clearInterval(downloadTimer)
        yellow.classList.add('black-lamp')
        yellow.classList.remove('yellow-lamp')
        green.classList.add('green-lamp')
        green.classList.remove('black-lamp')
        red.classList.add('black-lamp')
        red.classList.remove('red-lamp')
      }
      if (timeleft <= 5 && timeleft > 1) {
        yellow.classList.add('yellow-lamp')
        yellow.classList.remove('black-lamp')
        green.classList.add('black-lamp')
        green.classList.remove('green-lamp')
        red.classList.add('black-lamp')
        red.classList.remove('red-lamp')
      }
      timeleft -= 1

      secondCount.innerText = timeleft
    }, 1000)
  }
}
function start() {
  const rambu = new Rambu(10)
  rambu.changeLamp()
}
const element = document.getElementById('button-restart')
element.addEventListener('click', start)
