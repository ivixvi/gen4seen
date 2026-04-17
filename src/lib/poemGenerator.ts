// src/lib/poemGenerator.ts
import seedrandom from 'seedrandom';
import { templatesByRole, macroWords, fixedWords, THEME_CATEGORIES } from './poemData';
import type { PoemRole, ThemeCategory } from './poemData';

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

// 定数
const THEME_REUSE_RATE = 0.5;
const MAX_THEME_USES = 2;
const MAX_DEDUP_RETRIES = 3;

// 入力データから決定論的なシード値の元を生成する
function createBaseSeed(data: PoemFormData): string {
  return `${data.year}-${data.month}-${data.name}-${data.birthdate}-${data.bloodType}`;
}

// シード値に基づいた擬似乱数生成器を使って、配列からランダムに要素を1つ選択する
function getRandomElement<T>(rng: () => number, array: T[]): T {
  if (array.length === 0) {
    throw new Error('getRandomElement: empty array');
  }
  const index = Math.floor(rng() * array.length);
  return array[index];
}

// テーマ単語を事前に選び、同じ詩の中で一貫性を持たせるための置換関数
// themeReuse の確率でテーマ単語を再利用し、それ以外はランダムに選ぶ
// ただし同じ行内で同じ単語が連続しないよう、直前の単語と被ったら別を選ぶ
// 詩全体でテーマ単語の使用回数を制限し、偏りすぎを防ぐ
function replaceWithTheme(
  rng: () => number,
  poem: string,
  placeholder: string,
  wordList: string[],
  theme: string,
): string {
  const lines = poem.split('\n');
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
      // 同じ行内で既に使った単語なら、別の単語を試みる
      for (let retry = 0; retry < MAX_DEDUP_RETRIES && usedInLine.has(word) && wordList.length > 1; retry++) {
        word = getRandomElement(rng, wordList);
      }
      usedInLine.add(word);
      lines[i] = lines[i].replace(placeholder, word);
    }
  }

  return lines.join('\n');
}

// プレースホルダーを一括置換する（マクロ/固定共通）
function replacePlaceholders(
  rng: () => number,
  poem: string,
  entries: [string, string[]][],
): string {
  let result = poem;
  for (const [placeholder, wordList] of entries) {
    while (result.includes(placeholder)) {
      result = result.replace(placeholder, getRandomElement(rng, wordList));
    }
  }
  return result;
}

// 1つの詩を生成する内部関数
function generateSinglePoem(seed: string): string {
  const rng = seedrandom(seed);

  // 1. 起承転結の各roleから1つずつテンプレートを選択
  const roles: PoemRole[] = ['起', '承', '転', '結'];
  const poemTemplate = roles
    .map((role) => getRandomElement(rng, templatesByRole[role]))
    .join('\n');

  // 2. マクロプレースホルダーを展開（固定プレースホルダーに変換）
  const expandedPoem = replacePlaceholders(rng, poemTemplate, Object.entries(macroWords));

  // 3. テーマ単語を各カテゴリから1つずつ選出
  const themes = Object.fromEntries(
    THEME_CATEGORIES.map((cat) => [cat, getRandomElement(rng, fixedWords[cat])]),
  ) as Record<ThemeCategory, string>;

  // 4. 固定プレースホルダーを単語で置換
  let generatedPoem = expandedPoem;
  for (const [placeholder, wordList] of Object.entries(fixedWords)) {
    if (placeholder in themes) {
      generatedPoem = replaceWithTheme(rng, generatedPoem, placeholder, wordList, themes[placeholder as ThemeCategory]);
    } else {
      generatedPoem = replacePlaceholders(rng, generatedPoem, [[placeholder, wordList]]);
    }
  }

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
