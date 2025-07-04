// src/components/PoemDisplay.tsx
import React from 'react';
import type { Poems } from '../lib/poemGenerator';

interface PoemDisplayProps {
  poems: Poems;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({ poems }) => {
  // poemsが空（初期状態）の場合は何も表示しない
  if (!poems.early && !poems.mid && !poems.late) {
    return null;
  }

  return (
    <div>
      <div className="poem-section">
        <h2>上旬の詩</h2>
        <pre>{poems.early}</pre>
      </div>
      <div className="poem-section">
        <h2>中旬の詩</h2>
        <pre>{poems.mid}</pre>
      </div>
      <div className="poem-section">
        <h2>下旬の詩</h2>
        <pre>{poems.late}</pre>
      </div>
    </div>
  );
};

export default PoemDisplay;
