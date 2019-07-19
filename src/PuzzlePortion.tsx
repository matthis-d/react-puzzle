import * as React from "react";
import styled from "styled-components";

import { ImagePortion } from "./ImagePortion";
import {
  usePuzzleImage,
  usePuzzlePortions,
  usePuzzleDimensions
} from "./PuzzleGame";

interface Props {
  number: number | null;
  className?: string;
  onClick: Function;
}

const EmptyImage = styled.div`
  background-color: black;
`;

export const PuzzlePortion = ({
  number,
  className,
  onClick = () => null
}: Props) => {
  const src = usePuzzleImage();
  const { rowsCount, columnsCount } = usePuzzlePortions();
  const { height, width } = usePuzzleDimensions();

  if (number === null) {
    return <EmptyImage className={className} />;
  }

  return (
    <ImagePortion
      onClick={e => onClick(e, number)}
      totalHeight={height}
      totalWidth={width}
      src={src}
      number={number}
      rowsCount={rowsCount}
      columnsCount={columnsCount}
      className={className}
      title={`${number}`}
    />
  );
};
