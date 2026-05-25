// 問題データはこのファイルだけ編集すれば差し替えできます。
// type: "single" は1つ選択、"multi" は複数選択、"input" は入力式です。
// choices は4択でも5択でも、それ以上でも動きます。
// answer は選択肢番号を 1 始まりで指定します。例: [2] / [1, 4]
// input の acceptedAnswers は、正解グループごとに label と aliases を書けます。

const QUESTIONS = [
  {
    id: "sample-001",
    category: "サンプル",
    type: "single",
    prompt: "このテンプレートで問題を追加するとき、主に編集するファイルはどれか。",
    choices: [
      "index.html",
      "style.css",
      "questions.js",
      "app.js"
    ],
    answer: [3],
    explanation: "問題文・選択肢・正解・解説は questions.js にまとめます。別科目に使い回すときは、基本的にこのファイルだけを編集します。"
  },
  {
    id: "sample-002",
    category: "サンプル",
    type: "single",
    prompt: "5択問題の例です。Webページの見た目を主に担当するファイルはどれか。",
    choices: [
      "README.md",
      "style.css",
      "questions.js",
      "AGENTS.md",
      "LICENSE"
    ],
    answer: [2],
    explanation: "style.css は色、余白、カード、ボタンなどの見た目を担当します。5択でも4択でも同じ仕組みで表示できます。"
  },
  {
    id: "sample-003",
    category: "サンプル",
    type: "multi",
    prompt: "このテンプレートにある機能として正しいものを2つ選べ。",
    choices: [
      "4択・5択の表示",
      "解答後の解説表示",
      "サーバーへのログイン機能",
      "動画編集機能"
    ],
    answer: [1, 2],
    explanation: "選択肢数は固定ではなく、4択・5択のどちらも使えます。また、判定後に解説欄を表示できます。"
  },
  {
    id: "sample-004",
    category: "入力式サンプル",
    type: "input",
    prompt: "n-3系脂肪酸を3つ答えよ。",
    answerCount: 3,
    placeholder: "例: DHA",
    acceptedAnswers: [
      {
        label: "α-リノレン酸",
        aliases: ["アルファリノレン酸", "αリノレン酸", "alpha-リノレン酸", "alphaリノレン酸", "ALA"]
      },
      {
        label: "EPA",
        aliases: ["エイコサペンタエン酸", "イコサペンタエン酸", "エイコサペンタエン酸(EPA)"]
      },
      {
        label: "DHA",
        aliases: ["ドコサヘキサエン酸", "ドコサヘキサエン酸(DHA)"]
      }
    ],
    explanation: "n-3系脂肪酸の代表例は、α-リノレン酸、EPA、DHAです。入力式では、全角半角、空白、ハイフン・マイナス・長音などの揺れをある程度吸収します。"
  }
];
