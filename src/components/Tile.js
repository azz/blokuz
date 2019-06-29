import React, { memo } from 'react';

const Tile = ({ dragRef, isDragging, pattern, color }) => {
  return (
    <div
      ref={dragRef}
      style={{ cursor: 'pointer', opacity: isDragging ? 0.1 : 1 }}
    >
      {pattern.map((row, rowKey) => (
        <div key={rowKey} style={{ display: 'block' }}>
          {row.split('').map((col, colKey) => (
            <div
              key={colKey}
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
      ))}
    </div>
  );
};

export default memo(Tile);
