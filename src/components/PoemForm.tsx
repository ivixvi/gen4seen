// src/components/PoemForm.tsx
import React from 'react';

const PoemForm: React.FC = () => {
  return (
    <form>
      <div>
        <label htmlFor="month">占う対象の月:</label>
        <input type="number" id="month" name="month" min="1" max="12" />
      </div>
      <div>
        <label htmlFor="name">名前:</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label htmlFor="birthdate">生年月日:</label>
        <input type="date" id="birthdate" name="birthdate" />
      </div>
      <div>
        <label htmlFor="bloodType">血液型:</label>
        <select id="bloodType" name="bloodType">
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
