const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let score = 0;
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  score=0;
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (correct) {
    score++;
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = `Quiz Complete! Your Score: ${score}/${shuffledQuestions.length}`;
    startButton.classList.remove('hide');

    setTimeout(() => {
                window.location.href = '/dashboard'; // Redirect to the login page after 2 seconds
            }, 5000);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'How many outcomes are possible in one roll of a tetrahedral dice?',
    answers: [
      { text: '4', correct: true },
      { text: '6', correct: false }
    ]
  },
  {
    question: 'Which of these is a trial?',
    answers: [
      { text: 'Getting a 6', correct: false },
      { text: 'Getting 2 Heads', correct: false },
      { text: 'Rolling a Dice', correct: true },
      { text: 'Getting 2 red balls', correct: false }
    ]
  },
  {
    question: 'You roll a fair six-sided die. What is the probability of rolling a 3?',
    answers: [
      { text: '1/6', correct: true },
      { text: '1/3', correct: false },
      { text: '1.6', correct: false },
      { text: '1', correct: false }
    ]
  },
  {
    question: 'You have a standard deck of 52 cards. What is the probability of drawing a spade?',
    answers: [
      { text: '1/4', correct: true },
      { text: '1/13', correct: false }
    ]
  }
];
