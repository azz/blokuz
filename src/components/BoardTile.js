import React, { memo } from 'react';

const BoardTile = () => {
  const cellStyle = {
    boxSizing: 'border-box',
    border: '1px solid #555',
    width: '24px',
    height: '24px',
  };

  return <td style={cellStyle} />;
};

export default memo(BoardTile);
