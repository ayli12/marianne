function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateMathProblem() {
    let mathProblem = '';
    let result;
    do {
      mathProblem = '';
      for (let i = 0; i < 5; i++) {
        mathProblem += getRandomInt(1, 9);
        if (i < 4) {
          const operators = ['+', '-', '*', '/'];
          mathProblem += ` ${operators[getRandomInt(0, 3)]} `;
        }
      }
      result = calculateMathProblem(mathProblem); // Use the custom function to calculate the result
    } while (!Number.isInteger(result) || result < 0); // Ensure the result is an integer and positive
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
  
// Function to check the user's answer
function checkAnswer() {
    const mathProblem = document.getElementById('math-problem').textContent;
    const userAnswer = document.getElementById('user-answer').value;
    const resultElement = document.getElementById('result');
    const result = calculateMathProblem(mathProblem);
  
    if (userAnswer == result) {
      resultElement.textContent = 'Correct!';
      resultElement.style.color = 'green';
      handleCorrectAnswer(); // Call the function to handle correct answers
    } else {
      resultElement.textContent = 'False...';
      resultElement.style.color = 'red';
    }
  }
  
// Function to calculate the result of the math problem
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

// Event listener for the "Enter" key press
document.getElementById("user-answer").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
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
    pointsDisplay.textContent = `${points}`;
  }

// Function to handle correct answers and save the user's points
function handleCorrectAnswer() {
    points++; // Increment the points
    saveUserPoints(points); // Save the updated points to localStorage
    updatePointsDisplay(); // Update the points display
  }

// Function to update the points display
function updatePointsDisplay() {
    pointsDisplay.textContent = `${points}`;
  }

// Function to save the user's points to localStorage
function saveUserPoints(points) {
    localStorage.setItem('userPoints', points);
  }
  
// Function to retrieve the user's points from localStorage
function getUserPoints() {
    const points = localStorage.getItem('userPoints');
    return points ? parseInt(points) : 0;
  }

// Function to initialize the user's points from localStorage
function initializeUserPoints() {
    points = getUserPoints();
    updatePointsDisplay(); // Update the points display
  }

// Call the initializeUserPoints function to load the user's points when the app starts
initializeUserPoints();