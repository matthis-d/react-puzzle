import styled from "styled-components";

interface ImagePortionProps {
  src: string;
  number: number;
  columnsCount: number;
  rowsCount: number;
  totalHeight: number;
  totalWidth: number;
}

export const getXPosition = (
  number: number,
  columnsCount: number,
  width: number
) => ((number - 1) % columnsCount) * (width / columnsCount);

export const getYPosition = (
  number: number,
  columnsCount: number,
  rowsCount: number,
  height: number
) => Math.floor(Math.floor((number - 1) / columnsCount) * (height / rowsCount));

export const ImagePortion = styled.button<ImagePortionProps>`
  background: url(${props => props.src}) -${props =>
      getXPosition(
        props.number,
        props.columnsCount,
        props.totalWidth
      )}px -${props =>
      getYPosition(
        props.number,
        props.columnsCount,
        props.rowsCount,
        props.totalHeight
      )}px;
  border: none;
  border-radius: 0;
  position: relative;
  outline: none;
  cursor: pointer;
  height: ${props => props.totalHeight / props.rowsCount}px;
  width: ${props => props.totalWidth / props.columnsCount}px;
`;
