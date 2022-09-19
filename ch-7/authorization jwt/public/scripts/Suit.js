class Suit {
    #choices

    constructor() {
        this.#choices = ['rock', 'paper', 'scissor']
    }

    playerChoosen = (pId) => {
        let playerElement = document.getElementById("player-" + pId.toLowerCase());
        playerElement.classList.add("choosen");
    }

    comChoosen = (cId) => {
        let comElement = document.getElementById("com-" + cId.toLowerCase());
        comElement.classList.add("choosen");
    }

    comUnchoosen = (cId) => {
        let comElement = document.getElementById("com-" + cId.toLowerCase());
        comElement.classList.remove("choosen");
    }

    comChoice = () => {
        let randomChoices = Math.floor(Math.random() * 3)
        return this.#choices[randomChoices];
    }

    resultChoice = (playerChoice, comChoice) => {
        if (playerChoice === "paper" && comChoice === "rock" || playerChoice === "rock" && comChoice === "scissor" || playerChoice === "scissor" && comChoice === "paper") {
            document.getElementById("text-middle").innerHTML = '<h1 class="text-middle-win">Player 1 Win</h1>';
            return 'Win'
        }
        else if (playerChoice == comChoice) {
            document.getElementById("text-middle").innerHTML = '<h1 class="text-middle-draw">Draw</h1>';
            return 'Draw'
        }
        else {
            document.getElementById("text-middle").innerHTML = '<h1 class="text-middle-lose">Com Won</h1>';
            return 'Lose'
        }
    }

    disablePlayerChoosing = () => {
        const collection = document.getElementsByClassName("cursor-player");
        for (let i = 0; i < collection.length; i++) {
            collection[i].style.pointerEvents = "none";
            collection[i].style.cursor = "none";
            collection[i].removeAttribute('onclick')
        }
    }

    randomPick = (value) => {
        let comChoices = this.comChoice()

        this.playerChoosen(value)

        let counter = 0

        let randomInterval = setInterval(() => {
            this.comChoosen(this.#choices[counter])

            setTimeout(() => {
                this.comUnchoosen(this.#choices[counter])

                counter++

                counter = counter == 3 ? 0 : counter
            }, 130)
        }, 150)

        setTimeout(() => {
            clearInterval(randomInterval)
        }, 4500)

        setTimeout(() => {
            let resultChoices = this.resultChoice(value, comChoices)

            this.comChoosen(comChoices)

            let date = new Date()

            axios.post(window.location.origin + '/api/user-history', {
                userChoice: value,
                comChoice: comChoices,
                result: resultChoices,
                playingAt: date.toISOString()
            }).then((res) => {
                console.log(res.data.data)
            }).catch((err) => {
                console.log(err)
            })


        }, 5000)
    }

    playerChoice = (value) => {
        this.randomPick(value)
        this.disablePlayerChoosing()
    }

    static refresh = () => {
        document.location.reload()
    }
}