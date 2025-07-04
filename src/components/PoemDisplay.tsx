// src/components/PoemDisplay.tsx
import React from 'react';

interface PoemDisplayProps {
  poem: string;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem }) => {
  // poemが空の場合は何も表示しない
  if (!poem) {
    return null;
  }

  return (
    <div>
      <h2>生成された詩</h2>
      <pre>{poem}</pre>
    </div>
  );
};

export default PoemDisplay;
