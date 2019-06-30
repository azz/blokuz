import React, { useEffect } from 'react';
import Tile from './Tile';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const DraggableTile = props => {
  const [{ isDragging }, dragRef, preview] = useDrag({
    item: { type: 'Tile', ...props },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tile
      {...props}
      dragRef={dragRef}
      isDragging={isDragging}
      isDraggable={true}
    />
  );
};

export default DraggableTile;
