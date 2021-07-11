const tipSelectors = document.querySelector('.tip-selectors') 
const tipButtons = tipSelectors.querySelector('.tip-buttons')
const buttonPercentage = Array.from(tipButtons.children)
const inputsNumber = tipSelectors.querySelectorAll('input[type="number"]')
const resetButton = document.querySelector('#reset')

const calculate = _ => {
  const tipResults = document.querySelector('.results')
  const tipAmountElement = tipResults.querySelector('#tip-amount')
  const totalElement = tipResults.querySelector('#total')

  if (getBill() === 0 || getPeople() === 0) return 

  let totalTips = getBill() * getPercentage() / 100
  let tipPerPerson = totalTips / getPeople()
  let totalPerPerson = (getBill() + totalTips) / getPeople()

  tipAmountElement.textContent = '$' + tipPerPerson.toFixed(2)
  totalElement.textContent = '$' + totalPerPerson.toFixed(2)
  resetButton.removeAttribute('disabled')
  
}

const setPercentage = (target, buttons = "buttonPercentage") => {
  buttons.forEach(button => button.dataset.selected = "false");
  setTimeout(_ => {
    target.dataset.selected = "true"
    calculate()
  }, 1)
}

buttonPercentage.forEach(button => button.addEventListener('click', event => {
  const target = event.target
  setPercentage(target, buttonPercentage)
}))

inputsNumber.forEach(input => input.addEventListener('keyup', _ => {
  calculate()
}))

resetButton.addEventListener('click', event => {
  event.target.setAttribute('disabled', '')

  const tipAmountElement = document.querySelector('#tip-amount')
  const totalElement = document.querySelector('#total')
  tipAmountElement.innerHTML = '$0.00'
  totalElement.innerHTML = '$0.00'

  inputsNumber.forEach(input => input.value = '')
})

const getBill = _ => {
  return Number(tipSelectors.querySelector('#bill').value)
}

const getPeople = _ => {
  return Number(tipSelectors.querySelector('#people').value)
}

const getPercentage = _ => {
  return Number(tipSelectors.querySelector('[data-selected="true"]').value)
}
