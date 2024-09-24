type Map2048 = (number | null)[][];

export const assignRandomValue = (
  map2048: Map2048,
): { map2048: Map2048; assign: boolean } => {
  // 비어 있는 위치들이 { i: number; j: number }[] 형태로 저장된 배열
  const emptyPositions = map2048.flatMap((row, i) => {
    return row.flatMap((cell, j) => {
      return cell === null ? [{ i, j }] : [];
    });
  });

  // 비어 있는 위치들 중 랜덤하게 한 개를 뽑고
  const randomEmptyPosition = emptyPositions
    .sort(() => Math.random() - 0.5)
    .at(0);

  // 만약 이게 undefined 라면, 비어 있는 cell 이 없다는 뜻
  if (randomEmptyPosition === undefined) {
    return { map2048: map2048, assign: false }; // 아니면 throw를 해줄 수도 있고.. 아무튼 자유롭게 처리
  }

  const randomValue = Math.round(Math.random()) * 2 + 2; // 2 아니면 4 출력

  // assign 하는 대신 map().map() 을 돌린다
  return {
    map2048: map2048.map((row, i) => {
      return row.map((cell, j) => {
        if (i === randomEmptyPosition.i && j === randomEmptyPosition.j) {
          return randomValue;
        }

        return cell;
      });
    }),
    assign: true,
  };
};
