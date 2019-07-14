import styled from "styled-components";

interface PuzzleWrapperProps {
  readonly width: number;
  readonly height: number;
  readonly columnsCount: number;
  readonly rowsCount: number;
}

export const PuzzleWrapper = styled.div<PuzzleWrapperProps>`
  display: grid;
  grid-template-columns: repeat(
    ${props => props.columnsCount},
    ${props => props.width / props.columnsCount}px
  );
  grid-template-rows: repeat(
    ${props => props.rowsCount},
    ${props => props.height / props.rowsCount}px
  );
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
