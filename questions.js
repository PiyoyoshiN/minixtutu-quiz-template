// 問題データはこのファイルだけ編集すれば差し替えできます。
// type: "single" は1つ選択、"multi" は複数選択です。
// choices は4択でも5択でも、それ以上でも動きます。
// answer は選択肢番号を 1 始まりで指定します。例: [2] / [1, 4]

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
  }
];
