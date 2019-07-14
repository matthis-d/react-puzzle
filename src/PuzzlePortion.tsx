import * as React from "react";
import styled from "styled-components";

import { ImagePortion } from "./ImagePortion";

interface Props {
  src: string;
  number: number | null;
  columnsCount: number;
  rowsCount: number;
  totalHeight: number;
  totalWidth: number;
  onClick: Function;
}

const EmptyImage = styled.div`
  background-color: black;
`;

export const PuzzlePortion = ({
  number,
  src,
  totalHeight,
  totalWidth,
  rowsCount,
  columnsCount,
  onClick = () => null
}: Props) => {
  if (number === null) {
    return <EmptyImage />;
  }

  return (
    <ImagePortion
      onClick={e => onClick(e, number)}
      totalHeight={totalHeight}
      totalWidth={totalWidth}
      src={src}
      number={number}
      rowsCount={rowsCount}
      columnsCount={columnsCount}
    />
  );
};
