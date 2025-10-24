document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What color is the sky on a clear day?",
      choices: ["Blue", "Green", "Red", "Yellow"],
      answer: "Blue",
    },
    {
      question: "How many days are there in a week?",
      choices: ["5", "6", "7", "8"],
      answer: "7",
    },
    {
      question: "Which animal says 'Meow'?",
      choices: ["Dog", "Cat", "Cow", "Duck"],
      answer: "Cat",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else if (currentQuestionIndex === questions.length) {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", (e) => selectAnswer(choice,e));
      choicesList.append(li);
    });
  }

  function selectAnswer(choice,event) {
    // Remove background from all choices first
    document.querySelectorAll("#choices-list li").forEach((li) => {
      li.classList.remove("addBackground");
    });

    // Add background to the clicked one
    event.target.classList.add("addBackground");
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
      score++;
    }

    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
