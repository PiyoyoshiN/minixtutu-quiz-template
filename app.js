// Minixtutu Quiz Template
// 画面制御・採点・シャッフル・リセットを担当するファイルです。

const state = {
  allQuestions: Array.isArray(window.QUESTIONS) ? window.QUESTIONS : QUESTIONS,
  questions: [],
  currentIndex: 0,
  score: 0,
  answered: false,
  selectedCategory: "all"
};

const els = {
  progressText: document.getElementById("progressText"),
  scoreText: document.getElementById("scoreText"),
  categoryFilter: document.getElementById("categoryFilter"),
  categoryBadge: document.getElementById("categoryBadge"),
  typeBadge: document.getElementById("typeBadge"),
  questionText: document.getElementById("questionText"),
  helperText: document.getElementById("helperText"),
  choicesForm: document.getElementById("choicesForm"),
  feedback: document.getElementById("feedback"),
  explanationBox: document.getElementById("explanationBox"),
  explanationText: document.getElementById("explanationText"),
  checkBtn: document.getElementById("checkBtn"),
  nextBtn: document.getElementById("nextBtn"),
  shuffleBtn: document.getElementById("shuffleBtn"),
  resetBtn: document.getElementById("resetBtn")
};

function init() {
  if (!Array.isArray(state.allQuestions) || state.allQuestions.length === 0) {
    showEmptyMessage();
    return;
  }

  setupCategoryFilter();
  applyFilterAndReset();
  bindEvents();
}

function setupCategoryFilter() {
  const categories = [...new Set(state.allQuestions.map((q) => q.category || "未分類"))];

  els.categoryFilter.innerHTML = "";
  els.categoryFilter.appendChild(new Option("すべて", "all"));

  categories.forEach((category) => {
    els.categoryFilter.appendChild(new Option(category, category));
  });
}

function bindEvents() {
  els.checkBtn.addEventListener("click", checkAnswer);
  els.nextBtn.addEventListener("click", nextQuestion);
  els.shuffleBtn.addEventListener("click", shuffleCurrentQuestions);
  els.resetBtn.addEventListener("click", applyFilterAndReset);
  els.categoryFilter.addEventListener("change", () => {
    state.selectedCategory = els.categoryFilter.value;
    applyFilterAndReset();
  });
}

function applyFilterAndReset() {
  const filtered = state.selectedCategory === "all"
    ? [...state.allQuestions]
    : state.allQuestions.filter((q) => (q.category || "未分類") === state.selectedCategory);

  state.questions = filtered;
  state.currentIndex = 0;
  state.score = 0;
  state.answered = false;

  if (state.questions.length === 0) {
    showEmptyMessage();
    return;
  }

  renderQuestion();
}

function renderQuestion() {
  const question = getCurrentQuestion();
  state.answered = false;

  els.categoryBadge.textContent = question.category || "未分類";
  els.typeBadge.textContent = getTypeLabel(question);
  els.questionText.textContent = question.prompt;
  els.helperText.textContent = question.type === "multi"
    ? `正しいものを${question.answer.length}つ選んでください。`
    : "正しいものを1つ選んでください。";

  renderChoices(question);
  hideResult();
  updateStatus();

  els.checkBtn.disabled = false;
  els.nextBtn.disabled = true;
}

function renderChoices(question) {
  els.choicesForm.innerHTML = "";

  const inputType = question.type === "multi" ? "checkbox" : "radio";
  const name = `question-${question.id}`;

  question.choices.forEach((choice, index) => {
    const choiceNumber = index + 1;
    const label = document.createElement("label");
    label.className = "choice";

    const input = document.createElement("input");
    input.type = inputType;
    input.name = name;
    input.value = String(choiceNumber);

    const number = document.createElement("span");
    number.className = "choice-number";
    number.textContent = choiceNumber;

    const text = document.createElement("span");
    text.className = "choice-text";
    text.textContent = choice;

    label.append(input, number, text);
    els.choicesForm.appendChild(label);
  });
}

function checkAnswer() {
  if (state.answered) return;

  const question = getCurrentQuestion();
  const selected = getSelectedAnswers();

  if (selected.length === 0) {
    showFeedback("選択肢を選んでください。", "warn");
    return;
  }

  if (question.type === "multi" && selected.length !== question.answer.length) {
    showFeedback(`${question.answer.length}つ選んでください。`, "warn");
    return;
  }

  const isCorrect = isSameAnswer(selected, question.answer);
  state.answered = true;

  if (isCorrect) {
    state.score += 1;
  }

  markChoices(question, selected);
  showFeedback(isCorrect ? "正解！" : `不正解。正解は ${formatAnswer(question.answer)} です。`, isCorrect ? "correct" : "wrong");
  showExplanation(question.explanation || "解説はまだ入力されていません。");

  els.checkBtn.disabled = true;
  els.nextBtn.disabled = state.currentIndex >= state.questions.length - 1;
  updateStatus();

  if (state.currentIndex >= state.questions.length - 1) {
    els.nextBtn.textContent = "終了";
  }
}

function nextQuestion() {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex += 1;
    els.nextBtn.textContent = "次へ";
    renderQuestion();
  }
}

function shuffleCurrentQuestions() {
  state.questions = shuffleArray([...state.questions]);
  state.currentIndex = 0;
  state.score = 0;
  state.answered = false;
  renderQuestion();
}

function getCurrentQuestion() {
  return state.questions[state.currentIndex];
}

function getSelectedAnswers() {
  return [...els.choicesForm.querySelectorAll("input:checked")]
    .map((input) => Number(input.value))
    .sort((a, b) => a - b);
}

function isSameAnswer(selected, answer) {
  const sortedAnswer = [...answer].sort((a, b) => a - b);
  return selected.length === sortedAnswer.length && selected.every((value, index) => value === sortedAnswer[index]);
}

function markChoices(question, selected) {
  const correctSet = new Set(question.answer);
  const selectedSet = new Set(selected);

  [...els.choicesForm.querySelectorAll(".choice")].forEach((label, index) => {
    const choiceNumber = index + 1;
    const input = label.querySelector("input");
    input.disabled = true;

    if (correctSet.has(choiceNumber)) {
      label.classList.add("is-correct");
    }

    if (selectedSet.has(choiceNumber) && !correctSet.has(choiceNumber)) {
      label.classList.add("is-wrong");
    }
  });
}

function showFeedback(message, status) {
  els.feedback.hidden = false;
  els.feedback.textContent = message;
  els.feedback.className = `feedback ${status}`;
}

function showExplanation(text) {
  els.explanationBox.hidden = false;
  els.explanationText.textContent = text;
}

function hideResult() {
  els.feedback.hidden = true;
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.explanationBox.hidden = true;
  els.explanationText.textContent = "";
}

function updateStatus() {
  els.progressText.textContent = `${state.currentIndex + 1} / ${state.questions.length}`;
  els.scoreText.textContent = `Score: ${state.score}`;
}

function getTypeLabel(question) {
  if (question.type === "multi") {
    return `${question.choices.length}択・${question.answer.length}つ選択`;
  }
  return `${question.choices.length}択・1つ選択`;
}

function formatAnswer(answer) {
  return [...answer].sort((a, b) => a - b).join("・");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showEmptyMessage() {
  els.questionText.textContent = "問題がありません";
  els.helperText.textContent = "questions.js に問題を追加してください。";
  els.choicesForm.innerHTML = "";
  hideResult();
  els.categoryBadge.textContent = "-";
  els.typeBadge.textContent = "-";
  els.progressText.textContent = "0 / 0";
  els.scoreText.textContent = "Score: 0";
  els.checkBtn.disabled = true;
  els.nextBtn.disabled = true;
}

init();
