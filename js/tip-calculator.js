const tipSelectors = document.querySelector('.tip-selectors') 
const tipButtons = tipSelectors.querySelector('.tip-buttons')
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

const setPercentage = (target, buttons) => {
  buttons.forEach(button => button.dataset.selected = "false");
  setTimeout(_ => {
    target.dataset.selected = "true"
    calculate()
  }, 1)
}

tipButtons.addEventListener('click', event => {
  const key = event.target
  const buttons = Array.from(event.currentTarget.children)
  if (!key.closest('.percentage')) return
  setPercentage(key, buttons)
})

inputsNumber.forEach(input => input.addEventListener('keyup', event => {
  const target = event.currentTarget
  if (target.checkValidity()) {
    calculate()
    target.parentElement.classList.remove('not-zero', 'not-letters')
  } else {
    validityWarning(target)
  }
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

const validityWarning = target => {
  if (target.matches('#custom')) return 

  if (target.value === "") {
    target.parentElement.classList.add('not-letters')
  } else {
    target.parentElement.classList.add('not-zero')
  }
}
