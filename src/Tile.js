import React from 'react';

const Tile = ({ pattern, color }) =>
  pattern.map(row => (
    <div style={{ display: 'block' }}>
      {row.split('').map(col => (
        <div
          style={{
            display: 'inline-block',
            height: '24px',
            width: '24px',
            borderRadius: '2px',
            margin: '0 1px',
            background: col === 'X' ? color : 'transparent',
          }}
        />
      ))}
    </div>
  ));

export default Tile;
