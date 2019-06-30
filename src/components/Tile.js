import React, { memo } from 'react';

const Tile = ({ dragRef, isDragging, isDraggable, pattern, color }) => {
  return (
    <div
      ref={dragRef}
      style={{
        cursor: isDraggable ? 'grab' : 'not-allowed',
        display: 'grid',
        gridTemplateRows: `repeat(${pattern.length}, 24px)`,
        gridTemplateColumns: `repeat(${pattern[0].length}, 24px)`,
        gridAutoFlow: 'row',
        gridGap: '2px',
        opacity: isDragging ? 0.1 : 1,
      }}
    >
      {pattern.map((row, rowKey) => (
        <>
          {row.split('').map((col, colKey) => (
            <div
              key={colKey}
              style={{
                // display: 'inline-block',
                height: '100%',
                width: '100%',
                borderRadius: '2px',
                background: col === 'X' ? color : 'transparent',
              }}
            />
          ))}
        </>
      ))}
    </div>
  );
};

export default memo(Tile);
