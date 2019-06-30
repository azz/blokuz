/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState } from 'react';
import DraggableTile from './DraggableTile';
import Tile from './Tile';
import shapes from '../shapes';
import colors from '../colors';
import { transform } from '../logic';

const PlayerTiles = ({ G, ctx, playerID }) => {
  const isSolo = typeof playerID !== 'string';
  const [selectedPlayerID, selectPlayer] = useState(
    isSolo ? ctx.currentPlayer : playerID,
  );
  return (
    <div style={{ width: '410px', flexGrow: '1' }}>
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
  const [orientation, setOrientation] = useState(0);
  const [isFlippedX, setIsFlippedX] = useState(false);
  const [isFlippedY, setIsFlippedY] = useState(false);

  const color = colors[playerID];

  return (
    <div>
      <section style={{ padding: '0 24px' }}>
        <button onClick={() => setIsFlippedX(!isFlippedX)}>↔ Flip</button>
        <button onClick={() => setIsFlippedY(!isFlippedY)}>↕ Flip</button>
        <button onClick={() => setOrientation((orientation + 1) % 4)}>
          ↻ Rotate
        </button>
      </section>
      <section style={{ display: 'flex', flexFlow: 'row wrap' }}>
        {Object.entries(shapes)
          .filter(([key]) => !G.tilesUsed[playerID].includes(key))
          .map(([key, pattern]) => (
            <div key={key} style={{ padding: '13px' }}>
              {ctx.currentPlayer === playerID ? (
                <DraggableTile
                  name={key}
                  pattern={transform(pattern, {
                    isFlippedX,
                    isFlippedY,
                    orientation,
                  })}
                  color={color}
                />
              ) : (
                <Tile
                  name={key}
                  pattern={transform(pattern, {
                    isFlippedX,
                    isFlippedY,
                    orientation,
                  })}
                  color={color}
                />
              )}
            </div>
          ))}
      </section>
    </div>
  );
};

export default PlayerTiles;
