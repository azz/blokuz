/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState } from 'react';
import DraggableTile from './DraggableTile';
import Tile from './Tile';
import shapes from '../shapes';
import colors from '../colors';

const PlayerTiles = ({ G, ctx, playerID }) => {
  const isSolo = typeof playerID !== 'string';
  const [selectedPlayerID, selectPlayer] = useState(
    isSolo ? ctx.currentPlayer : playerID,
  );
  return (
    <div>
      <div>
        {isSolo ? null : (
          <span>
            You are playing as{' '}
            <strong style={{ color: colors[playerID] }}>
              {colors[playerID]}
            </strong>
            .
          </span>
        )}{' '}
        <span>
          It is{' '}
          <strong style={{ color: colors[ctx.currentPlayer] }}>
            {ctx.currentPlayer === playerID ? (
              <em>your</em>
            ) : (
              colors[ctx.currentPlayer] + "'s"
            )}
          </strong>{' '}
          turn.
        </span>
        <p>
          {' '}
          Players:{' '}
          {colors.map((color, index) => (
            <button
              disabled={selectedPlayerID === String(index)}
              style={{ background: color, color: 'white' }}
              onClick={() => selectPlayer(String(index))}
            >
              {color}
            </button>
          ))}
        </p>
      </div>
      <TilesForPlayer G={G} ctx={ctx} playerID={selectedPlayerID} />
    </div>
  );
};

const TilesForPlayer = ({ G, playerID, ctx }) => {
  const color = colors[playerID];

  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', maxWidth: '300px' }}>
      {Object.entries(shapes)
        .filter(([key]) => !G.tilesUsed[playerID].includes(key))
        .map(([key, pattern]) => (
          <div
            key={key}
            style={{
              display: 'block',
              padding: '4px',
            }}
          >
            {ctx.currentPlayer === playerID ? (
              <DraggableTile name={key} pattern={pattern} color={color} />
            ) : (
              <Tile name={key} pattern={pattern} color={color} />
            )}
          </div>
        ))}
    </div>
  );
};

export default PlayerTiles;
