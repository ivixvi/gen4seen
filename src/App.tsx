// src/App.tsx
import { useState } from 'react';
import './App.css';
import PoemForm from './components/PoemForm';
import PoemDisplay from './components/PoemDisplay';
import { generatePoems } from './lib/poemGenerator'; // 詩生成ロジックをインポート
import type { Poems } from './lib/poemGenerator';

// PoemFormから渡されるデータの型を定義
interface FormData {
  year: string;
  month: string;
  name: string;
  birthdate: string;
  bloodType: string;
}

const initialPoemsState: Poems = {
  early: '',
  mid: '',
  late: '',
};

function App() {
  const [poems, setPoems] = useState<Poems>(initialPoemsState);

  // フォームが送信されたときに呼ばれる関数
  const handleGeneratePoem = (formData: FormData) => {
    const newPoems = generatePoems(formData); // 実際のロジックで詩を生成
    setPoems(newPoems);
  };

  return (
    <>
      <h1>四行詩ジェネレーター</h1>
      <PoemForm onGenerate={handleGeneratePoem} />
      <PoemDisplay poems={poems} />
    </>
  );
}

export default App;
