const questions = [
  { question: "Which language structures the content of a web page?", options: ["CSS", "HTML", "JavaScript", "SQL"], answer: 1, explanation: "HTML defines the structure and content of web pages." },
  { question: "Which CSS property changes the text color?", options: ["font-style", "background", "color", "text-weight"], answer: 2, explanation: "The CSS color property sets the foreground color of text." },
  { question: "Which symbol begins a single-line comment in JavaScript?", options: ["<!--", "//", "**", "##"], answer: 1, explanation: "JavaScript single-line comments begin with two forward slashes." },
  { question: "Which HTML element creates a hyperlink?", options: ["<link>", "<href>", "<a>", "<url>"], answer: 2, explanation: "The anchor element, written as <a>, creates a hyperlink." },
  { question: "Which method selects an element by its ID in JavaScript?", options: ["document.getElementById()", "document.getClass()", "document.queryID()", "window.selectId()"], answer: 0, explanation: "document.getElementById() returns the element with the matching ID." },
  { question: "Which CSS layout system is designed for one-dimensional layouts?", options: ["Flexbox", "SQL", "Canvas", "JSON"], answer: 0, explanation: "Flexbox is useful for laying out items in a row or a column." },
  { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative System Setup", "Cascading Style Sheets", "Colorful Style Syntax"], answer: 2, explanation: "CSS stands for Cascading Style Sheets." },
  { question: "Which data type represents true or false?", options: ["String", "Boolean", "Array", "Number"], answer: 1, explanation: "A Boolean value is either true or false." },
  { question: "Which HTML attribute provides alternative text for an image?", options: ["title", "src", "href", "alt"], answer: 3, explanation: "The alt attribute supplies alternative text for an image." },
  { question: "Which array method adds an item to the end of a JavaScript array?", options: ["push()", "shift()", "pop()", "slice()"], answer: 0, explanation: "push() adds one or more elements to the end of an array." }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const nameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const questionCount = document.getElementById("question-count");
const scoreSoFar = document.getElementById("score-so-far");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const feedback = document.getElementById("feedback");

let currentQuestion = 0;
let score = 0;
let hasAnswered = false;
let playerName = "";

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  hasAnswered = false;
  playerName = nameInput.value.trim();
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  hasAnswered = false;
  const item = questions[currentQuestion];
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreSoFar.textContent = `Score: ${score}`;
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
  questionText.textContent = item.question;
  answerOptions.innerHTML = "";
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "View Results" : "Next Question";

  item.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = String.fromCharCode(65 + index);
    const label = document.createElement("span");
    label.textContent = optionText;
    button.append(letter, label);
    button.addEventListener("click", () => chooseAnswer(index));
    answerOptions.appendChild(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (hasAnswered) return;
  hasAnswered = true;
  const item = questions[currentQuestion];
  const buttons = [...answerOptions.querySelectorAll("button")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
    if (index === selectedIndex && index !== item.answer) button.classList.add("incorrect");
  });

  if (selectedIndex === item.answer) {
    score++;
    feedback.textContent = `Correct! ${item.explanation}`;
    feedback.classList.add("good");
  } else {
    feedback.textContent = `Not quite. ${item.explanation}`;
    feedback.classList.add("bad");
  }
  scoreSoFar.textContent = `Score: ${score}`;
  nextButton.disabled = false;
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progressBar.style.width = "100%";
  document.getElementById("final-score").textContent = score;
  document.getElementById("result-heading").textContent = playerName ? `Well done, ${playerName}!` : "Great work!";
  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById("result-message").textContent =
    percentage >= 80 ? "Excellent work! You know your web basics." :
    percentage >= 50 ? "Good effort! Review the explanations and try again." :
    "Keep practicing. Every attempt helps you learn.";
  document.getElementById("result-detail").textContent = `You answered ${score} out of ${questions.length} questions correctly (${percentage}%).`;
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
});
restartButton.addEventListener("click", startQuiz);
nameInput.addEventListener("keydown", event => {
  if (event.key === "Enter") startQuiz();
});
