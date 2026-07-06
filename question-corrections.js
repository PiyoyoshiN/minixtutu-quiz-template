// 問題データの微修正をまとめるファイルです。
// questions.js 本体を大きく触らず、授業内の解答表現に寄せたい箇所をここで上書きします。

{
  const sampleQuestions = [
    {
      id: "sample-001",
      category: "サンプル",
      hiddenInAll: true,
      type: "single",
      prompt: "本塁打王を取得したことのある選手は誰？",
      choices: [
        "清原和博",
        "金本知憲",
        "原辰徳",
        "新井貴浩"
      ],
      answer: [4],
      explanation: "新井貴浩は2005年に広島東洋カープで43本塁打を記録し、セ・リーグの本塁打王を獲得しています。"
    },
    {
      id: "sample-002",
      category: "サンプル",
      hiddenInAll: true,
      type: "single",
      prompt: "マーイーカの進化条件はどれ？",
      choices: [
        "一定レベル以上にした後、ゲーム機を逆さまにする",
        "一定レベル以上にした後、やみのいしを使う",
        "一定レベル以上にした後、ゲーム機を投げ合ってキャッチボールをする",
        "一定レベル以上にした後、名前をマイッカにする"
      ],
      answer: [1],
      explanation: "正解は、一定レベル以上にした後、ゲーム機を逆さまにする、です。"
    }
  ];

  const nonSampleQuestions = QUESTIONS.filter((item) => item.category !== "サンプル" && item.category !== "入力式サンプル");
  QUESTIONS.splice(0, QUESTIONS.length, ...sampleQuestions, ...nonSampleQuestions);
}

{
  const question = QUESTIONS.find((item) => item.id === "sports-nutrition-02-005");

  if (question) {
    question.explanation = "アラキドン酸はn-6系の多価不飽和脂肪酸で、授業内では必須脂肪酸として扱われています。ステアリン酸やラウリン酸は飽和脂肪酸、オレイン酸はn-9系の一価不飽和脂肪酸です。";
  }
}
