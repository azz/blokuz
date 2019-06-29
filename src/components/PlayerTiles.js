import React from 'react';
import DraggableTile from './DraggableTile';
import shapes from '../shapes';
import colors from '../colors';

const PlayerTiles = ({ G, ctx }) => {
  const color = colors[ctx.currentPlayer];

  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', maxWidth: '300px' }}>
      {Object.entries(shapes)
        .filter(([key]) => !G.tilesUsed[ctx.currentPlayer].includes(key))
        .map(([key, pattern]) => (
          <div
            key={key}
            style={{
              display: 'block',
              padding: '4px',
            }}
          >
            <DraggableTile name={key} pattern={pattern} color={color} />
          </div>
        ))}
    </div>
  );
};

export default PlayerTiles;
