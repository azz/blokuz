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
  }, []);

  return <Tile {...props} dragRef={dragRef} isDragging={isDragging} />;
};

export default DraggableTile;
