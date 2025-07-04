// src/components/PoemForm.tsx
import React, { useState } from 'react';

interface PoemFormProps {
  onGenerate: (formData: { month: string; name: string; birthdate: string; bloodType: string; }) => void;
}

const PoemForm: React.FC<PoemFormProps> = ({ onGenerate }) => {
  const [month, setMonth] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bloodType, setBloodType] = useState('A');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!month || !name || !birthdate) {
      alert('すべての必須項目を入力してください。');
      return;
    }
    onGenerate({ month, name, birthdate, bloodType });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="month">占う対象の月:</label>
        <input
          type="number"
          id="month"
          name="month"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="name">名前:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="birthdate">生年月日:</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="bloodType">血液型:</label>
        <select
          id="bloodType"
          name="bloodType"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="AB">AB</option>
          <option value="O">O</option>
        </select>
      </div>
      <button type="submit">詩を生成</button>
    </form>
  );
};

export default PoemForm;
