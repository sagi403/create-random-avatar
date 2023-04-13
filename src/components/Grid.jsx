import { MODES } from "../constants/const";

const Grid = ({
  cells,
  handleMouseDown,
  handleMouseUp,
  handleMouseMove,
  handleGridMouseDown,
  handleGridMouseUp,
  handleGridMouseMove,
  mode,
}) => {
  const renderCells = () => {
    return cells.map((rowCells, rowIndex) => {
      return rowCells.map((cellColor, colIndex) => {
        let cursorStyle = `url('/pen.png'), auto`;

        if (mode === MODES.eraser) {
          cursorStyle = `url('/eraser.png'), auto`;
        } else if (mode === MODES.drag) {
          cursorStyle = `move`;
        }

        const cellStyle = {
          backgroundColor: cellColor,
          cursor: cursorStyle,
        };

        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-4 h-4 border border-gray-300"
            style={cellStyle}
            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
            onMouseUp={handleMouseUp}
            onMouseMove={e => handleMouseMove(rowIndex, colIndex, e)}
            onDragStart={e => e.preventDefault()}
          ></div>
        );
      });
    });
  };

  return (
    <div
      className="w-64 h-64 grid grid-cols-16"
      onMouseDown={handleGridMouseDown}
      onMouseUp={handleGridMouseUp}
      onMouseMove={handleGridMouseMove}
    >
      {renderCells()}
    </div>
  );
};

export default Grid;
