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
    const result = calculateMathProblem(mathProblem); // Call the new function to calculate the result
    if (userAnswer == result) {
      resultElement.textContent = 'Correct!';
      resultElement.style.color = 'green';
      handleCorrectAnswer(); // Call the function to handle correct answers
    } else {
      resultElement.textContent = 'False...';
      resultElement.style.color = 'red';
    }
  }
  
  // New function to calculate the result of the math problem
  function calculateMathProblem(mathProblem) {
    const operations = mathProblem.split(' ');
    let result = parseInt(operations[0]);
    for (let i = 1; i < operations.length; i += 2) {
      const operator = operations[i];
      const operand = parseInt(operations[i + 1]);
      if (operator === '+') {
        result += operand;
      } else if (operator === '-') {
        result -= operand;
      } else if (operator === '*') {
        result *= operand;
      } else if (operator === '/') {
        result /= operand;
      }
    }
    return result;
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


// Define the points counter element
const pointsDisplay = document.getElementById('points');
let points = 0;

// Function to update the points display
function updatePointsDisplay() {
  pointsDisplay.textContent = points;
}

// Function to handle correct answers
function handleCorrectAnswer() {
  points++; // Increment the points
  updatePointsDisplay(); // Update the points display
}

// Function to update the points display
function updatePointsDisplay() {
    pointsDisplay.textContent = `${points}`;
  }