// Minixtutu Quiz Template
// 画面制御・採点・シャッフル・リセットを担当するファイルです。

const sourceQuestions = typeof QUESTIONS !== "undefined" ? QUESTIONS : window.QUESTIONS;

const state = {
  allQuestions: Array.isArray(sourceQuestions) ? sourceQuestions : [],
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
  els.helperText.textContent = getHelperText(question);

  renderAnswerArea(question);
  hideResult();
  updateStatus();

  els.checkBtn.disabled = false;
  els.nextBtn.disabled = true;
}

function getHelperText(question) {
  if (question.type === "multi") {
    return `正しいものを${question.answer.length}つ選んでください。`;
  }

  if (question.type === "input") {
    return `答えを${getInputAnswerCount(question)}つ入力してから「判定」を押してください。表記ゆれはある程度吸収します。`;
  }

  return "正しいものを1つ選んでください。";
}

function renderAnswerArea(question) {
  els.choicesForm.innerHTML = "";

  if (question.type === "input") {
    renderTextInputs(question);
    return;
  }

  renderChoices(question);
}

function renderChoices(question) {
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

function renderTextInputs(question) {
  const answerCount = getInputAnswerCount(question);

  for (let index = 0; index < answerCount; index += 1) {
    const label = document.createElement("label");
    label.className = "text-answer";

    const caption = document.createElement("span");
    caption.className = "text-answer-label";
    caption.textContent = `回答 ${index + 1}`;

    const input = document.createElement("input");
    input.type = "text";
    input.autocomplete = "off";
    input.inputMode = "text";
    input.placeholder = question.placeholder || "答えを入力";
    input.dataset.answerInput = "true";

    label.append(caption, input);
    els.choicesForm.appendChild(label);
  }
}

function checkAnswer() {
  if (state.answered) return;

  const question = getCurrentQuestion();

  if (question.type === "input") {
    checkInputAnswer(question);
    return;
  }

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
  finishQuestion();
}

function checkInputAnswer(question) {
  const rawAnswers = getTextAnswers();
  const filledAnswers = rawAnswers.filter((answer) => normalizeAnswer(answer) !== "");
  const requiredCount = getInputAnswerCount(question);

  if (filledAnswers.length < requiredCount) {
    showFeedback(`${requiredCount}つすべて入力してください。`, "warn");
    return;
  }

  const result = evaluateInputAnswer(question, rawAnswers);
  const isCorrect = result.isCorrect;
  state.answered = true;

  if (isCorrect) {
    state.score += 1;
  }

  markTextInputs(result.details);
  showFeedback(
    isCorrect
      ? "正解！"
      : `不正解。正解 ${result.matchedCount} / ${result.requiredCount}。正解例: ${result.answerLabels.join("・")}`,
    isCorrect ? "correct" : "wrong"
  );
  showExplanation(question.explanation || "解説はまだ入力されていません。");
  finishQuestion();
}

function finishQuestion() {
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
  els.nextBtn.textContent = "次へ";
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

function getTextAnswers() {
  return [...els.choicesForm.querySelectorAll("input[data-answer-input='true']")]
    .map((input) => input.value);
}

function isSameAnswer(selected, answer) {
  const sortedAnswer = [...answer].sort((a, b) => a - b);
  return selected.length === sortedAnswer.length && selected.every((value, index) => value === sortedAnswer[index]);
}

function evaluateInputAnswer(question, rawAnswers) {
  const groups = getAcceptedAnswerGroups(question);
  const matchedGroups = new Set();

  const details = rawAnswers.map((rawAnswer) => {
    const normalized = normalizeAnswer(rawAnswer);
    const groupIndex = groups.findIndex((group, index) => {
      return !matchedGroups.has(index) && group.normalizedAliases.includes(normalized);
    });

    if (groupIndex >= 0) {
      matchedGroups.add(groupIndex);
    }

    return {
      rawAnswer,
      normalized,
      isCorrect: groupIndex >= 0,
      matchedLabel: groupIndex >= 0 ? groups[groupIndex].label : ""
    };
  });

  return {
    isCorrect: matchedGroups.size === groups.length,
    matchedCount: matchedGroups.size,
    requiredCount: groups.length,
    answerLabels: groups.map((group) => group.label),
    details
  };
}

function getAcceptedAnswerGroups(question) {
  const acceptedAnswers = question.acceptedAnswers || [];

  return acceptedAnswers.map((answer) => {
    if (typeof answer === "string") {
      return {
        label: answer,
        normalizedAliases: [normalizeAnswer(answer)]
      };
    }

    const aliases = [answer.label, ...(answer.aliases || [])].filter(Boolean);
    return {
      label: answer.label,
      normalizedAliases: [...new Set(aliases.map(normalizeAnswer))]
    };
  });
}

function getInputAnswerCount(question) {
  if (Number.isInteger(question.answerCount) && question.answerCount > 0) {
    return question.answerCount;
  }

  if (Array.isArray(question.acceptedAnswers) && question.acceptedAnswers.length > 0) {
    return question.acceptedAnswers.length;
  }

  return 1;
}

function normalizeAnswer(value) {
  return String(value)
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[αΑ]/g, "alpha")
    .replace(/[βΒ]/g, "beta")
    .replace(/[γΓ]/g, "gamma")
    .replace(/[ωΩ]/g, "omega")
    .replace(/[‐‑‒–—―−ーｰ]/g, "-")
    .replace(/[\s　]/g, "");
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

function markTextInputs(details) {
  const labels = [...els.choicesForm.querySelectorAll(".text-answer")];

  labels.forEach((label, index) => {
    const input = label.querySelector("input");
    input.disabled = true;

    if (details[index]?.isCorrect) {
      label.classList.add("is-correct");
      return;
    }

    label.classList.add("is-wrong");
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

  if (question.type === "input") {
    return `入力式・${getInputAnswerCount(question)}つ回答`;
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
