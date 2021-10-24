import React, { useEffect, useState } from 'react';
import DraggableTile from './DraggableTile';
import Tile from './Tile';
import shapes from '../shapes';
import colors from '../colors';
import { transform } from '../logic';

const PlayerTiles = ({ G, ctx, playerID, events }) => {
  const isSolo = typeof playerID !== 'string';
  const [selectedPlayerID, selectPlayer] = useState(
    isSolo ? (ctx.turn % 4).toString() : playerID
  );

  useEffect(() => {
    if (isSolo || ctx.currentPlayer === playerID) {
      selectPlayer((ctx.turn % 4).toString());
    }
  }, [isSolo, ctx.currentPlayer, ctx.turn, playerID]);

  return (
    <div style={{ width: '410px', flexGrow: '1' }}>
      <section style={{ margin: '0 24px' }}>
        {isSolo ? null : (
          <span>
            You are playing as{' '}
            <strong style={{ color: colors[playerID] }}>
              {colors[playerID]}
            </strong>
            {ctx.numPlayers === 2 ? (
              <>
                <em> and </em>
                <strong style={{ color: colors[Number(playerID) + 2] }}>
                  {colors[Number(playerID) + 2]}
                </strong>
              </>
            ) : null}
            .
          </span>
        )}{' '}
        {ctx.gameover ? (
          <span>
            Game Over!{' '}
            <strong style={{ color: colors[ctx.gameover[0].player] }}>
              {colors[ctx.gameover[0].player]} wins!
            </strong>
            <ol>
              {ctx.gameover.map(({ player, points }) => (
                <li key={player}>
                  <strong style={{ color: colors[player] }}>
                    {colors[player]}
                  </strong>
                  : {points} remaining
                </li>
              ))}
            </ol>
          </span>
        ) : (
          <span>
            It is{' '}
            <strong style={{ color: colors[ctx.turn % 4] }}>
              {ctx.currentPlayer === playerID ? (
                <em>your</em>
              ) : (
                colors[ctx.turn % 4] + "'s"
              )}
            </strong>{' '}
            turn.
          </span>
        )}
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
      </section>
      <TilesForPlayer
        G={G}
        ctx={ctx}
        events={events}
        playerID={selectedPlayerID}
      />
    </div>
  );
};

const TilesForPlayer = ({ G, playerID, ctx, events }) => {
  const [orientation, setOrientation] = useState(0);
  const [isFlippedX, setIsFlippedX] = useState(false);
  const [isFlippedY, setIsFlippedY] = useState(false);

  const color = colors[playerID];

  return (
    <div>
      <section style={{ margin: '0 24px' }}>
        <button onClick={() => setIsFlippedX(!isFlippedX)}>↔ Flip</button>
        <button onClick={() => setIsFlippedY(!isFlippedY)}>↕ Flip</button>
        <button onClick={() => setOrientation((orientation + 1) % 4)}>
          ↻ Rotate
        </button>
        {' · '}
        <button
          disabled={ctx.turn < 4 || String(ctx.turn % 4) !== playerID}
          onClick={() => events.endTurn()}
        >
          Skip Turn
        </button>
      </section>
      <section style={{ display: 'flex', flexFlow: 'row wrap' }}>
        {Object.entries(shapes)
          .filter(([key]) => !G.tilesUsed[playerID].includes(key))
          .map(([key, pattern]) => (
            <div key={key} style={{ padding: '13px' }}>
              {String(ctx.turn % 4) === playerID ? (
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
