class Calculator {
    constructor(primaryDisplayText, secodaryDisplayText){
        this.primaryDisplayText = primaryDisplayText
        this.secodaryDisplayText = secodaryDisplayText
        this.clear()
    }

    clear() {
        this.secodaryDisplay = ''
        this.primaryDisplay = ''
        this.operation = undefined
    }

    delete() {
      this.secodaryDisplay = this.secodaryDisplay.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.secodaryDisplay.includes('.')) return
      this.secodaryDisplay = this.secodaryDisplay.toString() + number.toString()
    }

    chooseOperation(operation) {
      if(this.secodaryDisplay === '') return
      if(this.primaryDisplay !== '') {
        this.compute()
      }
      this.operation = operation
      this.primaryDisplay = this.secodaryDisplay
      this.secodaryDisplay = ''
    }

    compute() {
      let computation
      const prev = parseFloat(this.primaryDisplay)
      const current = parseFloat(this.secodaryDisplay)
      if(isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case 'X':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break  
        default:
          return      
      }
      this.secodaryDisplay = computation
      this.operation = undefined;
      this.primaryDisplay = ''
    }


    updateDisplay() {
      this.secodaryDisplayText.innerText =  this.secodaryDisplay
      this.primaryDisplayText.innerText = this.primaryDisplay  
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deletButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const primaryDisplayText = document.querySelector('[data-primary-display]')
const secodaryDisplayText = document.querySelector('[data-secondary-display]')

const calculator = new Calculator(primaryDisplayText, secodaryDisplayText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deletButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})