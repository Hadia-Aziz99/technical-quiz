import { fetchData, processQuizData, calculateScore } from "./utils.js";

(function () {
  let quizQuestions = [];
  let currentStep = 0;
  let userScore = 0;
  let userSelection = null;

  const qText = document.getElementById("question-text");
  const optList = document.getElementById("options-list");
  const progressSpan = document.getElementById("current-index");
  const scoreSpan = document.getElementById("score-val");
  const nextButton = document.getElementById("next-btn");

  const startup = async function () {
    const data = await fetchData();

    processQuizData(data, function (readyData) {
      quizQuestions = readyData;
      loadQuestion();
    });
  };

  const loadQuestion = function () {
    const current = quizQuestions[currentStep];
    const question = current.question;
    const options = current.options;

    qText.textContent = question;

    optList.innerHTML = "";

    for (let i = 0; i < options.length; i++) {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerHTML =
        "<span class='label'>" +
        String.fromCharCode(65 + i) +
        "</span> " +
        options[i];

      btn.onclick = function () {
        const allBtns = optList.getElementsByTagName("button");
        for (let j = 0; j < allBtns.length; j++) {
          allBtns[j].classList.remove("selected");
        }
        btn.classList.add("selected");
        userSelection = i;
        nextButton.disabled = false;
      };

      optList.appendChild(btn);
    }

    progressSpan.textContent = currentStep + 1;
    nextButton.textContent = "Submit Answer";
    nextButton.disabled = true;
  };

  const checkAnswer = function () {
    const current = quizQuestions[currentStep];
    const answer = current.answer;

    const buttons = optList.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.add("disabled");
    }

    if (userSelection === answer) {
      buttons[userSelection].classList.add("correct");
      userScore = calculateScore(userScore, 1);
      scoreSpan.textContent = userScore;
    } else {
      buttons[userSelection].classList.add("incorrect");
      buttons[answer].classList.add("correct");
    }

    nextButton.textContent =
      currentStep < quizQuestions.length - 1 ? "Next Question" : "View Results";

    nextButton.onclick = moveToNext;
  };

  const moveToNext = function () {
    currentStep++;
    if (currentStep < quizQuestions.length) {
      userSelection = null;
      loadQuestion();
      nextButton.onclick = checkAnswer;
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = function () {
    const mainEl = document.querySelector(".quiz-main");
    mainEl.innerHTML =
      "<div style='text-align:center; padding:40px 0;'>" +
      "<h2>Quiz Completed!</h2>" +
      "<p style='margin:20px 0; font-size:18px;'>Your final score is: <b>" +
      userScore +
      "</b> out of " +
      quizQuestions.length +
      "</p>" +
      "<button onclick='location.reload()' style='padding:10px 20px; cursor:pointer;'>Restart Quiz</button>" +
      "</div>";

    nextButton.style.display = "none";
  };

  nextButton.onclick = checkAnswer;
  startup();
})();
