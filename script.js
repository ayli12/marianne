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
      if (!document.getElementById('Enter').disabled) {
        document.getElementById("Enter").click();
      } else {
        document.getElementById("Next-Round").click();
      }
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


// Function to handle correct answers and level changes
function handleCorrectAnswer() {
    let points = parseInt(document.getElementById('points').textContent);
    points++;
    document.getElementById('points').textContent = points;
  
    // Check for level changes
    if (points >= 125) {
      updateLevel(6);
    } else if (points >= 75) {
      updateLevel(5);
    } else if (points >= 50) {
      updateLevel(4);
    } else if (points >= 24) {
      updateLevel(3);
    } else if (points >= 22) {
      updateLevel(2);
    } else if (points >= 20) {
      updateLevel(1);
    }
  
  // Save the updated points and level to local storage
  localStorage.setItem('points', points);
  localStorage.setItem('level', document.getElementById('level').textContent);
}
  
  // Function to update the user's level
  function updateLevel(level) {
    const currentLevel = parseInt(document.getElementById('level').textContent);
    document.getElementById('level').textContent = level;
  
    if (level > currentLevel) {
      // Call the function to display the level-specific popup with the corresponding image path
      displayLevelPopup(level, imagePath); //////
    }
  }
  
// Function to load user's points and level from local storage
function loadUserProgress() {
    const savedPoints = localStorage.getItem('points');
    const savedLevel = localStorage.getItem('level');
    if (savedPoints) {
      document.getElementById('points').textContent = savedPoints;
    }
    if (savedLevel) {
      document.getElementById('level').textContent = savedLevel;
    }
  }
  
  // Call the function to load user's points and level when the page loads
  window.onload = loadUserProgress;


///////////

// Define level-specific messages
const levelMessages = {
    1: "Du hast die Blüemlisalp erklommen!",
    2: "Du hast Le Rubli erklommen!",
    3: "Du hast den Finsteraarhorn erklommen!",
    4: "Du hast den Pizzo Tambo erklommen!",
    5: "Du hast die Parrotspitze erklommen!",
    6: "Du hast das Faulhorn erklommen!"
  };

const imagePath = {
    1:"assets/images/level_1.jpg",
    2:"assets/images/level_1.jpg"
}
  
  // Function to display level-specific popup with text and image
  function displayLevelPopup(level, imagePath) {
    const message = levelMessages[level];
    const popup = document.createElement('div');
    popup.classList.add('popup');
  
    const content = document.createElement('div');
    content.classList.add('popup-content');
  
    const text = document.createElement('p');
    text.textContent = message;
    content.appendChild(text);
  
    const image = document.createElement('img');
    image.src = imagePath[level]; // Use the provided image path for the specific level
    content.appendChild(image);
  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      popup.remove(); // Close the popup when the user clicks the close button
    });
    content.appendChild(closeButton);
  
    popup.appendChild(content);
    document.body.appendChild(popup);
  }

