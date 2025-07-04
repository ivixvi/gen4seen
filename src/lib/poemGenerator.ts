// src/lib/poemGenerator.ts
import seedrandom from 'seedrandom';
import { templates, words } from './poemData';

// 入力データの型定義
interface PoemFormData {
  year: string;
  month: string;
  name: string;
  birthdate: string;
  bloodType: string;
}

// 入力データから決定論的なシード値を生成する
function createSeed(data: PoemFormData): string {
  return `${data.year}-${data.month}-${data.name}-${data.birthdate}-${data.bloodType}`;
}

// シード値に基づいた擬似乱数生成器を使って、配列からランダムに要素を1つ選択する
function getRandomElement<T>(rng: () => number, array: T[]): T {
  const index = Math.floor(rng() * array.length);
  return array[index];
}

// 詩を生成するメイン関数
export function generatePoem(formData: PoemFormData): string {
  const seed = createSeed(formData);
  const rng = seedrandom(seed);

  // 1. 詩のテンプレートを選択
  let poemTemplate = getRandomElement(rng, templates);

  // 2. テンプレート内のプレースホルダーを単語で置換
  let generatedPoem = poemTemplate;
  Object.entries(words).forEach(([placeholder, wordList]) => {
    // テンプレート内のすべてのプレースホルダーを置換する
    while (generatedPoem.includes(placeholder)) {
      const randomWord = getRandomElement(rng, wordList);
      generatedPoem = generatedPoem.replace(placeholder, randomWord);
    }
  });

  return generatedPoem;
}
