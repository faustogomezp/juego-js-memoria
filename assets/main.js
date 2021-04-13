const btnStart = document.getElementById('btnStart')
const portionBlue =  document.getElementById('portionBlue')
const portionOrange =  document.getElementById('portionOrange')
const portionGreen =  document.getElementById('portionGreen')
const portionPurple =  document.getElementById('portionPurple')
const LAST_LEVEL = 10

class Game {
    constructor(){
        this.init = this.init.bind(this)
        this.init()
        this.generateSequence()
        setTimeout(this.nextLevel, 500)
    }



    init() {
        this.chooseColor = this.chooseColor.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.toggleBtnStart()
        this.level = 1
        this.colors = {
            portionBlue,
            portionOrange,
            portionGreen,
            portionPurple
        }
    }

    toggleBtnStart(){
        if (btnStart.classList.contains('hide')) {
            btnStart.classList.remove('hide')
        } else {
            btnStart.classList.add('hide')
        }
    }

    generateSequence() {
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel() {
        this.sublevel = 0
        this.illuminateSequence()
        this.addClickEvents()
    }


    transformNumberToColor(number) {
        switch (number) {
            case 0:
                return 'portionBlue'
            case 1:
                return 'portionPurple'
            case 2:
                return 'portionOrange'
            case 3:
                return 'portionGreen'
        }
    }

    transformColorToNumber(color) {
        switch (color) {
            case 'portionBlue':
                return 0
            case 'portionPurple':
                return 1
            case 'portionOrange':
                return 2
            case 'portionGreen':
                return 3
        }
    }

    illuminateSequence() {
        for (let i = 0; i < this.level; i++) {
            let color = this.transformNumberToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i)
        }
    }

    illuminateColor(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.offColor(color), 350)
    }

    offColor(color) {
        this.colors[color].classList.remove('light')
    }

    addClickEvents() {
        this.colors.portionBlue.addEventListener('click', this.chooseColor)
        this.colors.portionOrange.addEventListener('click', this.chooseColor)
        this.colors.portionPurple.addEventListener('click', this.chooseColor)
        this.colors.portionGreen.addEventListener('click', this.chooseColor)
    }

    deleteClickEvents() {
        this.colors.portionBlue.removeEventListener('click', this.chooseColor)
        this.colors.portionOrange.removeEventListener('click', this.chooseColor)
        this.colors.portionPurple.removeEventListener('click', this.chooseColor)
        this.colors.portionGreen.removeEventListener('click', this.chooseColor)
    }

    chooseColor(ev) {
        const nameColor = ev.target.dataset.color
        const numberColor = this.transformColorToNumber(nameColor)
        this.illuminateColor(nameColor)
        if (numberColor === this.sequence[this.sublevel]) {
            this.sublevel++
            if (this.sublevel === this.level) {
                this.level++
                this.deleteClickEvents()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.winGame()
                } else {
                    setTimeout(this.nextLevel, 1500)
                }
            }
        }  else {
            this.lossGame()
        }
    }

    winGame() {
        Swal.fire(
            'Good job!',
            'You win the game',
            'success'
          )
          .then(this.init)
    }

    lossGame() {
        Swal.fire(
            'Try Again!',
            'You loss the game',
            'error'
          )
          .then(() => {
              this.deleteClickEvents()
              this.init()
          })
    }
}


function startGame(){
    window.game = new Game()
}