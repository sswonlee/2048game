function Cell({ value }: cell) {
  const cellname =
    'cell cell-' + String(value === null ? 0 : value >= 2048 ? 2048 : value);
  return <div className={cellname}>{value !== null ? value : ''}</div>;
}
function GameBoard({ map2048 }: Map) {
  return (
    <>
      <div className="game-board">
        {map2048.map((row, rowIdx) =>
          row.map((value, colIdx) => (
            <Cell key={10 * rowIdx + colIdx} value={value} />
          )),
        )}
      </div>
      {}
    </>
  );
}

type cell = { value: number | null };
type Map = { map2048: (number | null)[][] };

export default GameBoard;
