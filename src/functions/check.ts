type Map2048 = (number | null)[][];
import { moveMapIn2048Rule } from './2048rule';
import { assignRandomValue } from './assignrandvalue';
export const checkfail = (map: Map2048): boolean => {
  const Canmove: boolean =
    moveMapIn2048Rule(map, 'up').isMoved ||
    moveMapIn2048Rule(map, 'down').isMoved ||
    moveMapIn2048Rule(map, 'left').isMoved ||
    moveMapIn2048Rule(map, 'right').isMoved;
  const Canassign: boolean = assignRandomValue(map).assign;
  return !Canmove && !Canassign;
};
export const check128 = (map: Map2048): boolean => {
  return map.some((row) => {
    return row.some((cell) => cell === 128);
  });
};
