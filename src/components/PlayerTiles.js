import React from 'react';
import DraggableTile from './DraggableTile';
import shapes from '../shapes';

const PlayerTiles = ({ color }) => {
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', maxWidth: '300px' }}>
      {shapes.map((shape, i) => (
        <div
          key={i}
          style={{
            display: 'block',
            padding: '4px',
          }}
        >
          <DraggableTile pattern={shape} color={color} />
        </div>
      ))}
    </div>
  );
};

export default PlayerTiles;
