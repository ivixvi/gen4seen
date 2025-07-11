// src/lib/poemData.ts

// 詩のテンプレート
export const templates = [
  "[物]と[物]と[物]と[物]",
  "<形容詞>[場所]にある<物>には気をつけなさい",
  "<形容詞>[場所]にいる<形容詞>[人]には気をつけなさい",
  "やがて訪れる<形容詞物-人>には気をつけなさい",
  "<形容詞物-人>が来たるときまでは",
  "それは<形容詞>[事]の兆し<なのだから>",
  "[物]は[動詞]<だろう>",
  "[人]は[物]を手に入れる<だろう>",
  "[人]は[物]を失う<だろう>",
  "[物]は[物]ではない",
  "風が[場所]を吹き抜ける<だろう>",
  "<人-物>は静かに[動詞]<だろう>",
  "<人-物>が姿を現す<だろう>",
  "失われたはずの[物]なのだから",
  "[場所]で再び[動詞]<だろう>",
  "[形容詞][場所]で待つ<だろう>",
  "<物>という名の[物]<なのだから>",
  "[場所]で<人-物>は舞い踊る<だろう>",
  "[形容詞]影が長く伸びて[動詞]<だろう>",
  "[形容詞][物]が[動詞]<だろう>",
  "[場所]の<人-物>が[動詞]とき",
  "選ぶべきは[事]への道<なのだから>",
  "その[物]が全てを変える<だろう>",
];

// プレースホルダーに対応する単語リスト
export const words = {
  // マクロ的なプレースホルダー
  // NOTE: for each で置換するため、動的な要素は優先的に定義する必要がある
  "<物>": ["<人-物>の[物]", "[形容詞][物]", "[物]"],
  "<形容詞物-人>": ["<形容詞>[物]", "[人]"],
  "<形容詞>": ["[形容詞]", ""],
  "<人-物>": ["[人]", "[物]"],
  "<だろう>": ["だろう", ""],
  "<なのだから>": ["なのだから", ""],
  // 固定プレースホルダー
  "[物]": [
    "道標", "天秤", "砂時計", "鍵", "鎖", "仮面", "素顔", "鏡", "羅針盤", "灯火",
    "光", "影", "夢", "記憶", "運命", "選択",
    "数字", "文字", "秘密", "試練", "好機",
    "結末", "戒め","意味","扉",
    "力", "正義", "星", "月", "太陽", "世界",
    "剣", "杯", "金貨", "杖",
  ],
  "[事]": [
    "真実", "虚構", "希望", "絶望",
    "変化", "始まり", "終わり",
    "解放",
  ],
  "[人]": [
    "あなた",
    "男", "女",
    "愚者", "賢者",
    "悪魔", "天使",
  ],
  "[場所]": ["交差点", "境界", "迷宮", "玉座", "地平線", "水面"],
  "[形容詞]": ["全ての","遠い", "近い", "まだ見ぬ", "忘れられた", "曖昧な", "確かな", "揺らぐ", "古き", "新たな", "避けられぬ", "未知なる"],
  "[動詞]": ["問いかける", "指し示す", "変わり始める", "待つ", "明らかになる", "隠されている", "試される",  "照らされる", "目覚める", "沈黙する","舞い踊る"],

};
