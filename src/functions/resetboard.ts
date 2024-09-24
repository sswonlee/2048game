type Map2048 = (number | null)[][];

export const resetboard = (map: Map2048, reset: boolean): resetmap => {
  const initialmap = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  if (reset) {
    return { map2048: initialmap, reset: false };
  } else {
    return { map2048: map, reset: false };
  }
};
type resetmap = {
  map2048: Map2048;
  reset: boolean;
};
