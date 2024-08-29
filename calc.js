const display1 = document.querySelector('#display1 span')
const display2 = document.querySelector('#display2 span')
const numberBtn = document.querySelectorAll('.number')
const operatorBtn = document.querySelectorAll('.operator')
const functionBtn = document.querySelectorAll('.function')
const equalBtn = document.querySelector('.equal')

const operator = {
  left : 0,
  right : 0,
  result : 0,
  oper : '',
  // 연산자가 연속으로 들어왔는지를 체크..
  isOperInSuccession : false,
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
    display1.textContent = operator.result
    display2.textContent = operator.result
    changeDisplay1FontSize()
    changeDisplay2FontSize()
    operator.reset()
  },
  reset: () => {
    operator.left = 0
    operator.right = 0
  }
}

// 입력 길이나 연산 결과에 따라 폰트 사이즈 조정
function changeDisplay1FontSize(){
  if(display1.textContent.length > 18){
    display1.style.fontSize = '15px'
  }else{
    display1.style.fontSize = '25px'
  }
}
function changeDisplay2FontSize(){
  if(display2.textContent.length > 23){
    display2.style.fontSize = '15px'
  }else if(display2.textContent.length > 15){
    display2.style.fontSize = '20px'
  }else if(display2.textContent.length > 11){
    display2.style.fontSize = '30px'
  }else{
    display2.style.fontSize = '40px'
  }
}

function clearAll(){
  display1.textContent = ''
  display2.textContent = '0'
  operator.reset()
  operator.oper = ''
  operator.result = 0
  changeDisplay2FontSize()
}

// nember, '.' addEventListener
numberBtn.forEach((numBtn) => {
  numBtn.addEventListener('click', () =>{
   // 입력값이 15자 이상이 되면 더 이상 입력되지 않도록..
    if(display2.textContent.length >= 15) return
    
    // indexOf의 리턴 값이 -1이 나온다는 것은 '.'이 아직 없다는 의미
    // 그러므로 -1이 아니라는것은 이미 display에 '.'이 있다는 것이므르 리턴..
    if(numBtn.textContent === '.' &&
      display2.textContent.indexOf('.') !== -1) return
      
      // 연산이 처음이 아니라면..
      // 연산결과를 지우고 새로입력할때
      if(operator.result !== 0){
        display2.textContent = ''
        operator.result = 0
      }
      
      // display의 입력값이 0이고, 버튼입력이 '.'이 들어온것이 아니라면
      // display를 비워준다
      if(display2.textContent === '0' && numBtn.textContent !== '.'){
        display2.textContent = ''
      }

      display2.textContent += numBtn.textContent
      changeDisplay2FontSize()

      operator.isOperInSuccession = false;
  })
})

// operator addEventListener
operatorBtn.forEach((operBtn) => {
  operBtn.addEventListener('click', () => {
    // 연산자가 연속으로 입력되었을 때...
    if(operator.isOperInSuccession) {
      operator.oper = operBtn.textContent
      display1.textContent = `${operator.left} ${operator.oper}`
      return
    }
    if(operator.left === 0){
      operator.left = Number(display2.textContent)
      display2.textContent = '0'
      display1.textContent = operator.left
    } else {
      operator.right = Number(display2.textContent)
      display2.textContent = ''
    }

    if(operator.oper === ''){
      operator.oper = operBtn.textContent
      display1.textContent += ` ${operator.oper}`
    }else{
      operator.equal()
      operator.oper = operBtn.textContent
      display1.textContent += ` ${operator.oper}`
      operator.left = Number(display2.textContent)
    }

    changeDisplay1FontSize()

    operator.isOperInSuccession = true;
  })
})

// equal addEventListener
equalBtn.addEventListener('click', () => {
  if(operator.right === 0){
    operator.right = Number(display2.textContent)
    display2.textContent = '0'
  }
  if(operator.left === 0 || operator.right === 0) {
    clearAll()
    return
  }
  
  operator.equal()
  operator.oper = ''
  operator.isOperInSuccession = false;
})

// function addEventListener
functionBtn.forEach((funcBtn) => {
  funcBtn.addEventListener('click', () =>{
    if(funcBtn.textContent === 'C'){
      clearAll()
    }
  })
})