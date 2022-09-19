const options = ['rock', 'paper', 'scissor']

let playerSection = comSection = ''

options.forEach(function (item) {
    playerSection += `
        <div class="col-4 col-md-12">
            <button class="choices-rps cursor-player my-3" id="player-${item}"
                onclick="suit.playerChoice('${item}')">
                <img class="img-fluid img-rps img-rps-player""
                    src=" /images/${item}.png" alt="${item}">
            </button>
        </div>
    `
    comSection += `
        <div class="col-4 col-md-12">
            <button class="choices-rps cursor-com my-3" id="com-${item}">
                <img class="img-fluid img-rps" src="/images/${item}.png" alt="${item}">
            </button>
        </div>
    `
})

document.getElementById('player-section').innerHTML = playerSection
document.getElementById('com-section').innerHTML = comSection

const suit = new Suit()