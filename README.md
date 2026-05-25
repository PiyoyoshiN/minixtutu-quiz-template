# Minixtutu Quiz Template

問題データを差し替えるだけで再利用できる、軽量なクイズアプリです。

## 特徴

- HTML / CSS / JavaScript だけで動きます
- 4択・5択など、選択肢数を自由に変えられます
- 1つ選択、複数選択、入力式に対応しています
- 解答後に正誤表示と解説欄を表示します
- 進捗、スコア、シャッフル、リセット機能があります
- スマホ表示にも対応しています

## ファイル構成

```text
index.html    画面の骨組み
style.css     デザイン
app.js        クイズの進行と採点
questions.js  問題データ
AGENTS.md     Codex向けの作業メモ
README.md     説明書
```

## 問題を追加する方法

基本的には `questions.js` だけ編集します。

### 1つ選択の問題

```js
{
  id: "q-001",
  category: "第1回",
  type: "single",
  prompt: "問題文をここに書く。",
  choices: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
  answer: [2],
  explanation: "解答後に表示する解説を書く。"
}
```

### 複数選択の問題

```js
{
  id: "q-002",
  category: "第1回",
  type: "multi",
  prompt: "正しいものを2つ選べ。",
  choices: ["選択肢1", "選択肢2", "選択肢3", "選択肢4", "選択肢5"],
  answer: [1, 4],
  explanation: "複数選択でも解説を表示できます。"
}
```

### 入力式の問題

```js
{
  id: "q-003",
  category: "栄養",
  type: "input",
  prompt: "n-3系脂肪酸を3つ答えよ。",
  answerCount: 3,
  placeholder: "例: DHA",
  acceptedAnswers: [
    { label: "α-リノレン酸", aliases: ["アルファリノレン酸", "αリノレン酸", "ALA"] },
    { label: "EPA", aliases: ["エイコサペンタエン酸", "イコサペンタエン酸"] },
    { label: "DHA", aliases: ["ドコサヘキサエン酸"] }
  ],
  explanation: "n-3系脂肪酸の代表例は、α-リノレン酸、EPA、DHAです。"
}
```

## 入力式の判定について

入力式では、次の表記ゆれをある程度吸収します。

- 全角と半角
- 大文字と小文字
- 余分な空白
- ハイフン、マイナス、長音記号
- 一部のギリシャ文字表記

ただし、完全な意味判定ではありません。必要な別名は `aliases` に追加してください。

## 注意点

- 選択式の `answer` は 1 始まりの番号で書きます。
- 4択でも5択でも、`choices` の数を変えるだけで対応できます。
- `type: "single"` はラジオボタン、`type: "multi"` はチェックボックスになります。
- 入力式は `type: "input"` を使います。
- 問題ごとに `id` は重複しないようにしてください。

## 動作確認

ブラウザで `index.html` を開くだけで動きます。

GitHub Pagesで公開する場合は、リポジトリの Settings から Pages を開き、`main` ブランチのルートを公開元にしてください。
