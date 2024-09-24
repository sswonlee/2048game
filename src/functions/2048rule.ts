/**
 * 2048 게임에서, Map을 특정 방향으로 이동했을 때 결과를 반환하는 함수입니다.
 * @param map 2048 맵. 빈 공간은 null 입니다.
 * @param direction 이동 방향
 * @returns 이동 방향에 따른 결과와 이동되었는지 여부
 */
export const moveMapIn2048Rule = (
  map: Map2048,
  direction: Direction,
): MoveResult => {
  if (!validateMapIsNByM(map)) throw new Error('Map is not N by M');
  const rotatedMap = rotateMapCounterClockwise(map, rotateDegreeMap[direction]);

  const { result, isMoved, score } = moveLeft(rotatedMap);

  return {
    result: rotateMapCounterClockwise(result, revertDegreeMap[direction]),
    isMoved,
    score,
  };
};

const validateMapIsNByM = (map: Map2048) => {
  if (map[0] === undefined) throw new Error(); //Error map[0] undefined
  const firstColumnCount = map[0].length;
  return map.every((row) => row.length === firstColumnCount);
};

const rotateMapCounterClockwise = (
  map: Map2048,
  degree: 0 | 90 | 180 | 270,
): Map2048 => {
  if (map[0] === undefined) throw new Error(); //Error map[0] undefined
  const rowLength = map.length;
  const columnLength = map[0].length;

  switch (degree) {
    case 0:
      return map;
    case 90:
      return Array.from({ length: columnLength }, (_, columnIndex) =>
        Array.from({ length: rowLength }, (_, rowIndex) => {
          if (map[rowIndex] === undefined) throw new Error();
          return map[rowIndex][columnLength - columnIndex - 1] ?? null;
        }),
      );
    case 180:
      return Array.from(
        { length: rowLength },
        (_, rowIndex): (number | null)[] =>
          Array.from({ length: columnLength }, (_, columnIndex) => {
            const d = rowLength - rowIndex - 1;
            if (map[d] === undefined) throw new Error();
            return map[d][columnLength - columnIndex - 1] ?? null;
          }),
      );
    case 270:
      return Array.from(
        { length: columnLength },
        (_, columnIndex): (number | null)[] =>
          Array.from({ length: rowLength }, (_, rowIndex) => {
            const d = rowLength - rowIndex - 1;
            if (map[d] === undefined) throw new Error();
            return map[d][columnIndex] ?? null;
          }),
      );
  }
};

const moveLeft = (map: Map2048): MoveResult => {
  const movedRows = map.map(moveRowLeft);
  const result = movedRows.map((movedRow) => movedRow.result);
  const isMoved = movedRows.some((movedRow) => movedRow.isMoved);
  const score = movedRows
    .map((movedRow) => movedRow.score)
    .reduce((sum, s) => (sum += s), 0);
  return { result, isMoved, score };
};

const moveRowLeft = (
  row: Cell[],
): { result: Cell[]; isMoved: boolean; score: number } => {
  const reduced = row.reduce(
    (acc: { lastCell: Cell; result: Cell[]; score: number }, cell) => {
      if (cell === null) {
        return acc;
      } else if (acc.lastCell === null) {
        return { ...acc, lastCell: cell };
      } else if (acc.lastCell === cell) {
        return {
          result: [...acc.result, cell * 2],
          lastCell: null,
          score: acc.score + cell * 2,
        };
      } else {
        return {
          result: [...acc.result, acc.lastCell],
          lastCell: cell,
          score: acc.score,
        };
      }
    },
    { lastCell: null, result: [], score: 0 },
  );

  const result = [...reduced.result, reduced.lastCell];
  const resultRow = Array.from(
    { length: row.length },
    (_, i) => result[i] ?? null,
  );

  return {
    result: resultRow,
    isMoved: row.some((cell, i) => cell !== resultRow[i]),
    score: reduced.score,
  };
};

const rotateDegreeMap: DirectionDegreeMap = {
  up: 90,
  right: 180,
  down: 270,
  left: 0,
};

const revertDegreeMap: DirectionDegreeMap = {
  up: 270,
  right: 180,
  down: 90,
  left: 0,
};

type Cell = number | null;
type Map2048 = Cell[][];
type Direction = 'up' | 'left' | 'right' | 'down';
type RotateDegree = 0 | 90 | 180 | 270;
type DirectionDegreeMap = Record<Direction, RotateDegree>;
type MoveResult = { result: Map2048; isMoved: boolean; score: number };
