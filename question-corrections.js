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
      explanation: "正解は新井貴浩。2005年に広島で43本塁打を放ち、セ・リーグ本塁打王を獲得しています。ここがちょっとした引っかけで、清原和博は通算525本塁打のレジェンド級スラッガーですが、実は本塁打王のタイトルはなし。金本知憲も原辰徳も強打者として有名ですが、本塁打王には届いていません。この4人の中でタイトル持ちは新井さん、という問題です。"
    },
    {
      id: "sample-002",
      category: "サンプル",
      hiddenInAll: true,
      type: "single",
      prompt: "Pokémon LEGENDS Z-Aにおいて、マーイーカの進化条件はどれか？",
      choices: [
        "一定レベル以上にした後、ゲーム機を逆さまにする",
        "一定レベル以上にした後、やみのいしを使う",
        "一定レベル以上にした後、ゲーム機を投げ合ってキャッチボールをする",
        "一定レベル以上にした後、名前をマイッカにする"
      ],
      answer: [1],
      explanation: "正解は「一定レベル以上にした後、ゲーム機を逆さまにする」。Pokémon LEGENDS Z-Aでは、レベル30以上のマーイーカを進化できる状態にしたうえで、Nintendo Switch本体を逆さまにして進化を実行するとカラマネロになります。やみのいしを使うわけでも、名前を「マイッカ」にするわけでもありません。ましてやゲーム機を投げ合ってキャッチボールするのは進化条件以前に普通に危ないです。"
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
