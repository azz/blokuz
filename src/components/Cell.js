import React, { memo } from 'react';

const Cell = ({ color }) => {
  const cellStyle = {
    boxSizing: 'border-box',
    border: `1px solid ${color || '#555'}`,
    width: '100%',
    height: '100%',
    background: color,
    borderRadius: '2px',
  };

  return <div style={cellStyle} />;
};

export default memo(Cell);
