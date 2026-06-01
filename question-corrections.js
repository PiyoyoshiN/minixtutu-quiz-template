// 問題データの微修正をまとめるファイルです。
// questions.js 本体を大きく触らず、授業内の解答表現に寄せたい箇所をここで上書きします。

{
  const question = QUESTIONS.find((item) => item.id === "sports-nutrition-02-005");

  if (question) {
    question.explanation = "アラキドン酸はn-6系の多価不飽和脂肪酸で、授業内では必須脂肪酸として扱われています。ステアリン酸やラウリン酸は飽和脂肪酸、オレイン酸はn-9系の一価不飽和脂肪酸です。";
  }
}
