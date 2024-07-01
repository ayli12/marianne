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
      document.getElementById('Enter').disabled = true; // Disable the "Enter" button
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


// Function to play the next round
function playNextRound() {
    document.getElementById('user-answer').value = '';
    document.getElementById('result').textContent = '';
    displayMathProblem();
    document.getElementById('Enter').disabled = true; // Disable the "Enter" button
    setTimeout(() => {
      document.getElementById('Enter').disabled = false; // Enable the "Enter" button after a delay
    }, 20); // Adjust the delay time as needed
  }
  
  displayMathProblem();


// Define the points counter element
const pointsDisplay = document.getElementById('points');
const levelDisplay = document.getElementById('level'); // Add a level display element in your HTML

let points = 0;
let level = 1;

// Function to update the points and level display
function updatePointsDisplay() {
    pointsDisplay.textContent = `${points}`;
    levelDisplay.textContent = `Level: ${level}`;
  }

let previousLevel = 1;

// Function to update the user's level based on their points
function updateLevel() {
    let newLevel = 1;
    if (points >= 350) {
      newLevel = 6;
    } else if (points >= 200) {
      newLevel = 5;
    } else if (points >= 100) {
      newLevel = 4;
    } else if (points >= 23) {
      newLevel = 3;
    } else if (points >= 21) {
      newLevel = 2;
    }
    
    if (newLevel > level) {
      level = newLevel;
      displayLevelUpPopup(level); // Call the function to display the pop-up for the new level
    }
    updatePointsDisplay(); // Update the points and level display
  }

// Function to handle correct answers and update points and level
function handleCorrectAnswer() {
    points++; // Increment the points
    updateLevel(); // Update the user's level based on the new points
    updatePointsDisplay(); // Update the points and level display
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

// Function to initialize the user's points and level from localStorage
function initializeUserPoints() {
    points = getUserPoints();
    updateLevel(); // Update the user's level based on the points
    updatePointsDisplay(); // Update the points and level display
  }

// Call the initializeUserPoints function to load the user's points when the app starts
initializeUserPoints();

// Function to display the level-up pop-up based on the level
function displayLevelUpPopup(level) {
    const popup = document.getElementById('levelPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');
    const popupImage = document.getElementById('popupImage');
    const popupCloseButton = document.getElementById('popupCloseButton');
  
    popupTitle.textContent = `Level ${level}`; // Set the title of the pop-up
  
    // Hide all level-specific content elements
    const allLevelContents = document.getElementsByClassName('level-popup-content');
    for (let content of allLevelContents) {
      content.style.display = 'none';
    }
  
    // Show the content specific to the current level
    const levelContent = document.getElementById(`level${level}Content`);
    levelContent.style.display = 'block';
  
    // Set the image for the pop-up
    popupImage.src = levelContent.querySelector('img').src;
  
    popup.style.display = 'block'; // Show the pop-up
  
    // Event handling for the close button to hide the pop-up
    popupCloseButton.addEventListener('click', function() {
      popup.style.display = 'none'; // Hide the pop-up
      // Add any additional logic to return to the game
    });
  }

// Call the initializeUserPoints function to load the user's points when the app starts
initializeUserPoints();
