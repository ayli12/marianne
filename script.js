function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateMathProblem() {
    let mathProblem = '';
    for (let i = 0; i < 5; i++) {
      mathProblem += getRandomInt(1, 9);
      if (i < 4) {
        const operators = ['+', '-', '*', '/'];
        mathProblem += ` ${operators[getRandomInt(0, 3)]} `;
      }
    }
    return mathProblem;
  }
  
  function displayMathProblemWithDelay(mathProblem, index) {
    if (index < mathProblem.length) {
      const mathProblemElement = document.getElementById('math-problem');
      mathProblemElement.textContent += mathProblem[index];
      if (mathProblem[index] !== ' ') {
        setTimeout(() => {
          displayMathProblemWithDelay(mathProblem, index + 1);
        }, 1000);
      } else {
        displayMathProblemWithDelay(mathProblem, index + 1);
      }
    }
  }
  
  function displayMathProblem() {
    const mathProblemElement = document.getElementById('math-problem');
    mathProblemElement.textContent = ''; // Clear the previous math problem
    const mathProblem = generateMathProblem();
    displayMathProblemWithDelay(mathProblem, 0);
  }
  
  function checkAnswer() {
    const mathProblem = document.getElementById('math-problem').textContent;
    const userAnswer = document.getElementById('user-answer').value;
    const resultElement = document.getElementById('result');
    const correctAnswer = eval(mathProblem);
    if (userAnswer == correctAnswer) {
      resultElement.textContent = 'Correct!';
      resultElement.style.color = 'green';
    } else {
      resultElement.textContent = 'False...';
      resultElement.style.color = 'red';
    }
  }

document.getElementById("user-answer")
  .addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
      document.getElementById("Enter").click();
  }
});


  function playNextRound() {
    document.getElementById('user-answer').value = '';
    document.getElementById('result').textContent = '';
    displayMathProblem();
  }
  
  displayMathProblem();