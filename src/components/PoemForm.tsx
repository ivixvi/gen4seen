// src/components/PoemForm.tsx
import React, { useState, useEffect } from 'react';

interface FormData {
  year: string;
  month: string;
  name: string;
  birthdate: string;
  bloodType: string;
}

interface PoemFormProps {
  onGenerate: (formData: FormData) => void;
}

const STORAGE_KEY = 'poemGeneratorFormData';

const PoemForm: React.FC<PoemFormProps> = ({ onGenerate }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear().toString());
  const [month, setMonth] = useState((now.getMonth() + 1).toString()); // getMonth() is 0-indexed
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bloodType, setBloodType] = useState('A');

  // Load data from local storage on initial render
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.name) setName(parsedData.name);
        if (parsedData.birthdate) setBirthdate(parsedData.birthdate);
        if (parsedData.bloodType) setBloodType(parsedData.bloodType);
      }
    } catch (error) {
      console.error("Failed to parse form data from local storage", error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { year, month, name, birthdate, bloodType };
    if (!year || !month || !name || !birthdate) {
      alert('すべての必須項目を入力してください。');
      return;
    }

    // Save data to local storage
    try {
      const dataToSave = { name, birthdate, bloodType };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Failed to save form data to local storage", error);
    }

    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="year">占う対象の年月:</label>
        <div className="year-month-container">
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <span>年</span>
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
          <span>月</span>
        </div>
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
