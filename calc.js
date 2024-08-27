const display = document.querySelector('.display input')
const numberBtn = document.querySelectorAll('.number')
const operatorBtn = document.querySelectorAll('.operator')
const functionBtn = document.querySelectorAll('.function')
const equalBtn = document.querySelector('.equal')

const operator = {
  left : 0,
  right : 0,
  result : 0,
  oper : '',
  operate : () => {
    if(operator.oper === '+'){
      operator.result = operator.left + operator.right
    }else if(operator.oper === '-'){
      operator.result = operator.left - operator.right
    }else if(operator.oper === '*'){
      operator.result = operator.left * operator.right
    }else if(operator.oper === '/'){
      operator.result = operator.left / operator.right
    }else if(operator.oper === '%'){
      operator.result = operator.left % operator.right
    }
  },
  equal: () => {
    operator.operate()
    display.value = operator.result
    changeDisplayFontSize()
    operator.reset()
  },
  reset: () => {
    operator.left = 0
    operator.right = 0
  }
}

// 입력 길이나 연산 결과에 따라 폰트 사이즈 조정
function changeDisplayFontSize(){
  if(display.value.length > 15){
    display.style.fontSize = '20px'
  }else if(display.value.length > 11){
    display.style.fontSize = '30px'
  }else if(display.value.length > 9){
    display.style.fontSize = '40px'
  }else{
    display.style.fontSize = '50px'
  }
}

// nember, '.' addEventListener
numberBtn.forEach((numBtn) => {
  numBtn.addEventListener('click', () =>{
    console.log(numBtn.textContent)

    // indexOf의 리턴 값이 -1이 나온다는 것은 '.'이 아직 없다는 의미
    // 그러므로 -1이 아니라는것은 이미 display에 '.'이 있다는 것이므르 리턴..
    if(numBtn.textContent === '.' &&
       display.value.indexOf('.') !== -1) return

    // 연산이 처음이 아니라면..
    // 연산결과를 지우고 새로입력할때, =이 아닌 
    if(operator.result !== 0){
      display.value = ''
      operator.result = 0;
    }

    // display의 입력값이 0이고, 버튼입력이 '.'이 들어온것이 아니라면
    // display를 비워준다
    if(display.value === '0' && numBtn.textContent !== '.'){
      display.value = ''
    }

    display.value += numBtn.textContent
    changeDisplayFontSize()
  })
})

// operator addEventListener
operatorBtn.forEach((operBtn) => {
  operBtn.addEventListener('click', () => {
    console.log(operBtn.textContent)
    
    if(display.value === '0') return
    if(operator.left === 0){
      operator.left = Number(display.value)
      display.value = '0'
    } else {
      operator.right = Number(display.value)
      display.value = ''
    }

    if(operator.oper === ''){
      operator.oper = operBtn.textContent
    }else{
      operator.equal()
      operator.oper = operBtn.textContent
      operator.left = Number(display.value)
    }
  })
})

// equal addEventListener
equalBtn.addEventListener('click', () => {
  if(operator.right === 0){
    operator.right = Number(display.value)
    display.value = '0'
  }
  if(operator.left === 0 || operator.right === 0) return
  
  operator.equal()
  operator.oper = ''
})

// function addEventListener
functionBtn.forEach((funcBtn) => {
  funcBtn.addEventListener('click', () =>{
    console.log(funcBtn.textContent)
    if(funcBtn.textContent === 'C'){
      display.value = '0'
      operator.reset()
      operator.oper = ''
      operator.result = 0
      changeDisplayFontSize()
    } else if(funcBtn.textContent === '±'){

    }
  })
})