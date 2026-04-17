// src/lib/poemGenerator.ts
import seedrandom from 'seedrandom';
import { templatesByRole, words } from './poemData';

// 入力データの型定義
interface PoemFormData {
  year: string;
  month: string;
  name: string;
  birthdate: string;
  bloodType: string;
}

export interface Poems {
  early: string;
  mid: string;
  late: string;
}

// 入力データから決定論的なシード値の元を生成する
function createBaseSeed(data: PoemFormData): string {
  return `${data.year}-${data.month}-${data.name}-${data.birthdate}-${data.bloodType}`;
}

// シード値に基づいた擬似乱数生成器を使って、配列からランダムに要素を1つ選択する
function getRandomElement<T>(rng: () => number, array: T[]): T {
  const index = Math.floor(rng() * array.length);
  return array[index];
}

// テーマ単語を事前に選び、同じ詩の中で一貫性を持たせるための置換関数
// themeReuse の確率でテーマ単語を再利用し、それ以外はランダムに選ぶ
// ただし同じ行内で同じ単語が連続しないよう、直前の単語と被ったら別を選ぶ
// 詩全体でテーマ単語の使用回数を制限し、偏りすぎを防ぐ
const THEME_REUSE_RATE = 0.5;
const MAX_THEME_USES = 2;

function replaceWithTheme(
  rng: () => number,
  poem: string,
  placeholder: string,
  wordList: string[],
  theme: string,
): string {
  let result = poem;
  const lines = result.split('\n');
  let themeUseCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const usedInLine = new Set<string>();
    while (lines[i].includes(placeholder)) {
      let word: string;
      if (themeUseCount < MAX_THEME_USES && rng() < THEME_REUSE_RATE) {
        word = theme;
        themeUseCount++;
      } else {
        word = getRandomElement(rng, wordList);
      }
      // 同じ行内で既に使った単語なら、別の単語を試みる（最大3回）
      for (let retry = 0; retry < 3 && usedInLine.has(word) && wordList.length > 1; retry++) {
        word = getRandomElement(rng, wordList);
      }
      usedInLine.add(word);
      lines[i] = lines[i].replace(placeholder, word);
    }
  }

  return lines.join('\n');
}

// テーマ単語を持つカテゴリ（固定プレースホルダーのうち、詩の一貫性に寄与するもの）
const THEME_CATEGORIES = ['[物]', '[場所]', '[人]'] as const;

// 1つの詩を生成する内部関数
function generateSinglePoem(seed: string): string {
  const rng = seedrandom(seed);

  // 1. 起承転結の各roleから1つずつテンプレートを選択
  const roles = ['起', '承', '転', '結'] as const;
  let poemTemplate = roles
    .map((role) => getRandomElement(rng, templatesByRole[role]))
    .join('\n');

  // 2. テーマ単語を各カテゴリから1つずつ選出
  const themes = Object.fromEntries(
    THEME_CATEGORIES.map((cat) => [cat, getRandomElement(rng, words[cat])]),
  );

  // 3. テンプレート内のプレースホルダーを単語で置換
  let generatedPoem = poemTemplate;
  Object.entries(words).forEach(([placeholder, wordList]) => {
    if (placeholder in themes) {
      // テーマカテゴリは一貫性を持たせて置換
      generatedPoem = replaceWithTheme(rng, generatedPoem, placeholder, wordList, themes[placeholder]);
    } else {
      while (generatedPoem.includes(placeholder)) {
        const randomWord = getRandomElement(rng, wordList);
        generatedPoem = generatedPoem.replace(placeholder, randomWord);
      }
    }
  });

  return generatedPoem;
}

// 3つの詩（上旬・中旬・下旬）を生成するメイン関数
export function generatePoems(formData: PoemFormData): Poems {
  const baseSeed = createBaseSeed(formData);

  return {
    early: generateSinglePoem(baseSeed + '-early'),
    mid: generateSinglePoem(baseSeed + '-mid'),
    late: generateSinglePoem(baseSeed + '-late'),
  };
}
