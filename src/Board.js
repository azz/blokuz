import React from 'react';
import Tile from './Tile';
import shapes from './shapes';

export default class Board extends React.Component {
  onClick(id) {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
      this.props.events.endTurn();
    }
  }

  isActive(id) {
    if (!this.props.isActive) return false;
    if (this.props.G.cells[id] !== null) return false;
    return true;
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    const cellStyle = {
      boxSizing: 'border-box',
      border: '1px solid #555',
      width: '24px',
      height: '24px',
    };

    let tbody = [];
    for (let i = 0; i < 20; i++) {
      let cells = [];
      for (let j = 0; j < 20; j++) {
        const id = 20 * i + j;
        cells.push(
          <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
            {this.props.G.cells[id]}
          </td>,
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div style={{ display: 'flex' }}>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        <div
          style={{ display: 'flex', flexFlow: 'row wrap', maxWidth: '300px' }}
        >
          {shapes.map(shape => (
            <div
              style={{
                display: 'block',
                padding: '4px',
              }}
            >
              <Tile pattern={shape} color="red" />
            </div>
          ))}
        </div>
        {winner}
      </div>
    );
  }
}
