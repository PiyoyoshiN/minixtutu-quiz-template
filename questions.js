// 問題データはこのファイルだけ編集すれば差し替えできます。
// type: "single" は1つ選択、"multi" は複数選択、"input" は入力式です。
// choices は4択でも5択でも、それ以上でも動きます。
// answer は選択肢番号を 1 始まりで指定します。例: [2] / [1, 4]
// input の acceptedAnswers は、正解グループごとに label と aliases を書けます。
// hiddenInAll: true を付けた問題は「すべて（サンプル除外）」には出ません。

const QUESTIONS = [
  {
    id: "sample-001",
    category: "サンプル",
    hiddenInAll: true,
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
    hiddenInAll: true,
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
    hiddenInAll: true,
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
    hiddenInAll: true,
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
  },
  {
    id: "sports-nutrition-01-001",
    category: "スポーツ栄養学①",
    type: "single",
    prompt: "糖質に関する記述のうち、正しいものを1つ選びなさい。",
    choices: [
      "炭水化物は天然に広く分布する有機化合物で、リン、塩素、窒素からなる。",
      "単糖類とは、同じ種類の単糖が2つ結合した糖類のことで、スクロースはこれにあたる。",
      "二糖類とは、異なる種類の単糖が2つ結合した糖類のことで、グルコースはこれにあたる。",
      "多糖類とは、単糖が多数結合したもので、でんぷんはこれにあたる。"
    ],
    answer: [4],
    explanation: "多糖類は単糖が多数結合した糖質で、でんぷんは多糖類に分類されます。炭水化物は主に炭素・水素・酸素からなり、グルコースは単糖類です。"
  },
  {
    id: "sports-nutrition-01-002",
    category: "スポーツ栄養学①",
    type: "single",
    prompt: "糖質について正しいものを1つ選びなさい。",
    choices: [
      "しょ糖は、ぶどう糖とガラクトースが結合された二糖類である。",
      "グリコーゲンは植物性食品に貯蔵されている多糖類である。",
      "ラクトースは、牛乳や人乳などに含まれる。",
      "ぶどう糖は単糖のうちで最も甘味度が高い。"
    ],
    answer: [3],
    explanation: "ラクトースは乳糖で、牛乳や人乳などに含まれます。しょ糖はグルコース＋フルクトース、グリコーゲンは動物の貯蔵多糖類、最も甘味度が高い糖はフルクトースです。"
  },
  {
    id: "sports-nutrition-01-003",
    category: "スポーツ栄養学①",
    type: "single",
    prompt: "ホルモンに関する記述のうち、正しいものを1つ選びなさい。",
    choices: [
      "アドレナリンは、副腎皮質から分泌される。",
      "インスリンは、腎臓から分泌される。",
      "コルチゾールは、副腎髄質から分泌される。",
      "グルカゴンは、膵臓から分泌される。"
    ],
    answer: [4],
    explanation: "グルカゴンは膵臓のα細胞から分泌され、血糖値を上げる方向に働きます。アドレナリンは副腎髄質、コルチゾールは副腎皮質、インスリンは膵臓から分泌されます。"
  },
  {
    id: "sports-nutrition-01-004",
    category: "スポーツ栄養学①",
    type: "single",
    prompt: "食物繊維と難消化性糖質に関する記述である。正しいものを1つ選びなさい。",
    choices: [
      "不溶性食物繊維は、血圧を上昇させる。",
      "水溶性食物繊維は、大腸内pHを上昇させる。",
      "難消化性糖質は、インスリンの分泌を促進させる。",
      "難消化性糖質の過剰摂取は、便秘を引き起こす。",
      "有用菌増殖効果のあるオリゴ糖は、プレバイオティクスである。"
    ],
    answer: [5],
    explanation: "有用菌を増やす働きのあるオリゴ糖はプレバイオティクスです。食物繊維には血糖上昇の緩和、血中コレステロール値の正常化、便通の正常化などの働きがあります。"
  },
  {
    id: "sports-nutrition-01-005",
    category: "スポーツ栄養学①",
    type: "single",
    prompt: "二糖類と構成単糖の組合せとして、正しいものを1つ選びなさい。",
    choices: [
      "マルトース ― グルコース＋フルクトース",
      "スクロース ― グルコース＋フルクトース",
      "ラクトース ― グルコース＋グルコース",
      "トレハロース ― ガラクトース＋ガラクトース"
    ],
    answer: [2],
    explanation: "スクロースはグルコース＋フルクトースからなる二糖類です。マルトースはグルコース＋グルコース、ラクトースはグルコース＋ガラクトース、トレハロースはグルコース2分子からなります。"
  },
  {
    id: "sports-nutrition-02-006",
    category: "スポーツ栄養学②",
    type: "single",
    prompt: "コレステロールを最も多く含み、肝臓で合成されたコレステロールを全身に運搬するリポたんぱく質はどちらか。",
    choices: [
      "LDL",
      "HDL"
    ],
    answer: [1],
    explanation: "LDLはコレステロールを多く含み、肝臓で合成されたコレステロールを全身の組織へ運びます。HDLは余分なコレステロールを回収して肝臓へ戻す側です。"
  },
  {
    id: "sports-nutrition-02-007",
    category: "スポーツ栄養学②",
    type: "single",
    prompt: "全身の組織から過剰なコレステロールを回収して、肝臓に戻すリポたんぱく質はどちらか。",
    choices: [
      "LDL",
      "HDL"
    ],
    answer: [2],
    explanation: "HDLは全身の組織から過剰なコレステロールを回収し、肝臓に戻す働きをします。LDLはコレステロールを全身へ運ぶ側です。"
  },
  {
    id: "sports-nutrition-02-008",
    category: "スポーツ栄養学②",
    type: "single",
    prompt: "n-3系脂肪酸は、血中の中性脂肪やLDLコレステロールをどう変化させる作用があるか。",
    choices: [
      "減少",
      "増加"
    ],
    answer: [1],
    explanation: "n-3系脂肪酸には、血中の中性脂肪やLDLコレステロールを減らし、HDLコレステロールを増やす働きがあります。"
  },
  {
    id: "sports-nutrition-02-009",
    category: "スポーツ栄養学②",
    type: "input",
    prompt: "n-3系脂肪酸を3つ書きなさい。",
    answerCount: 3,
    placeholder: "例: EPA",
    acceptedAnswers: [
      {
        label: "α-リノレン酸",
        aliases: ["アルファリノレン酸", "αリノレン酸", "alpha-リノレン酸", "alphaリノレン酸", "ALA"]
      },
      {
        label: "EPA",
        aliases: ["エイコサペンタエン酸", "イコサペンタエン酸", "IPA", "EPA(IPA)", "エイコサペンタエン酸(IPA)"]
      },
      {
        label: "DHA",
        aliases: ["ドコサヘキサエン酸", "ドコサヘキサエン酸(DHA)"]
      }
    ],
    explanation: "n-3系脂肪酸の代表例は、α-リノレン酸、EPA（IPA）、DHAです。"
  },
  {
    id: "sports-nutrition-02-010",
    category: "スポーツ栄養学②",
    type: "input",
    prompt: "n-6系脂肪酸を3つ書きなさい。",
    answerCount: 3,
    placeholder: "例: リノール酸",
    acceptedAnswers: [
      {
        label: "リノール酸",
        aliases: ["linoleic acid"]
      },
      {
        label: "γ-リノレン酸",
        aliases: ["ガンマリノレン酸", "γリノレン酸", "gamma-リノレン酸", "gammaリノレン酸", "GLA"]
      },
      {
        label: "アラキドン酸",
        aliases: ["arachidonic acid", "AA"]
      }
    ],
    explanation: "n-6系脂肪酸の代表例は、リノール酸、γ-リノレン酸、アラキドン酸です。"
  }
];
