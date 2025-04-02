'use client';
import React, { useState } from 'react';
import { Compass, Flame, FerrisWheel } from 'lucide-react';

const Topbar = () => {
  const [topbarState, setTopBarState] = useState<number>(-1);

  // Handle button click to change the active state
  const handleButtonClick = (index: number) => {
    setTopBarState(index);
  };

  return (
    <nav>
      <button 
        onClick={() => handleButtonClick(0)} 
        style={{ 
          background: topbarState === 0 ? '#ddd' : 'transparent',
          border: 'none',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <Compass size={24} color={topbarState === 0 ? '#000' : '#fff'} />
      </button>

      <button 
        onClick={() => handleButtonClick(1)} 
        style={{
          background: topbarState === 1 ? '#ddd' : 'transparent',
          border: 'none',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <Flame size={24} color={topbarState === 1 ? '#000' : '#fff'} />
      </button>

      <button 
        onClick={() => handleButtonClick(2)} 
        style={{
          background: topbarState === 2 ? '#ddd' : 'transparent',
          border: 'none',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <FerrisWheel size={24} color={topbarState === 2 ? '#000' : '#fff'} />
      </button>
    </nav>
  );
};

export default Topbar;
