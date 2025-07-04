// src/App.tsx
import { useState } from 'react';
import './App.css';
import PoemForm from './components/PoemForm';
import PoemDisplay from './components/PoemDisplay';
import { generatePoem } from './lib/poemGenerator'; // 詩生成ロジックをインポート

// PoemFormから渡されるデータの型を定義
interface FormData {
  month: string;
  name: string;
  birthdate: string;
  bloodType: string;
}

function App() {
  const [poem, setPoem] = useState('');

  // フォームが送信されたときに呼ばれる関数
  const handleGeneratePoem = (formData: FormData) => {
    const newPoem = generatePoem(formData); // 実際のロジックで詩を生成
    setPoem(newPoem);
  };

  return (
    <>
      <h1>四行詩ジェネレーター「天使の自動筆記」</h1>
      <PoemForm onGenerate={handleGeneratePoem} />
      <PoemDisplay poem={poem} />
    </>
  );
}

export default App;
