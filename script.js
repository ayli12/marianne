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
    if (points >= 12500) {
      updateLevel(6);
    } else if (points >= 7500) {
      updateLevel(5);
    } else if (points >= 5000) {
      updateLevel(4);
    } else if (points >= 2400) {
      updateLevel(3);
    } else if (points >= 2200) {
      updateLevel(2);
    } else if (points >= 200) {
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
    6: "Du hast das Faulhorn erklommen!",
    7: "Du hast die Hundwiler Höhi erklommen!"
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
    closeButton.textContent = 'Schliessen';
    closeButton.addEventListener('click', () => {
      popup.remove(); // Close the popup when the user clicks the close button
    });
    content.appendChild(closeButton);
  
    popup.appendChild(content);
    document.body.appendChild(popup);
  }

// Function to display the popup when the page loads
function displayPopupOnLoad() {
  const message = "Liebe Marianne, <br><br>Das ist  Matherhorn – deine eigene Rechenapp 🤓 <br><br> Es funktioniert wie folgt: Für jede richtig beantwortete Rechenfrage bekommst du einen Punkt (woohoo!) Nach einigen gesammelten Punkten erreichst du jeweils einen Schweizer Berggipfel wo es Gschenkli auf dich wartet. <br><br>Viel Spass beim Spielen und Gipfelstürmen! <br><br>💙 <br><br>P.S. Rechnen musst du sequenziell – Punkt vor Strich zählt hier nicht";
  /////const imagePath = "assets/images/logo.jpg"; // Replace with the path to the welcome image

  const popup = document.createElement('div');
  popup.classList.add('popup');

  const content = document.createElement('div');
  content.classList.add('popup-content');

  const text = document.createElement('p');
  text.innerHTML = message; // Use innerHTML to interpret HTML tags
  content.appendChild(text);

  const image = document.createElement('img');
  ///image.src = imagePath; // Use the provided image path for the welcome image
  image.style.width = "50px"; // Set the width of the image
  image.style.height = "auto"; // Maintain the aspect ratio
  content.appendChild(image);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Auf gehts!';
  closeButton.addEventListener('click', () => {
    popup.remove(); // Close the popup when the user clicks the close button
  });
  content.appendChild(closeButton);

  popup.appendChild(content);
  document.body.appendChild(popup);
  loadUserProgress();
}

// Call the function to display the popup when the page loads
window.onload = displayPopupOnLoad;

// Function to prevent scrolling when the user clicks inside the answer field on a mobile device
function preventScrollOnMobile() {
  const answerField = document.getElementById('user-answer');

  answerField.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Prevent the default scrolling behavior
  });
}

// Call the function to prevent scrolling when the user clicks inside the answer field on a mobile device
preventScrollOnMobile();