import { useState, useCallback } from "react";
import { SketchPicker } from "react-color";
import { DEFAULT_CELLS_COLOR, DEFAULT_COLOR, MODES } from "../constants/const";

const AvatarDesign = ({ cells, setCells, setCode }) => {
  const [defaultColor, setDefaultColor] = useState(DEFAULT_CELLS_COLOR);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [draggingGrid, setDraggingGrid] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState("");

  const updateCode = useCallback(
    newCells => {
      let codeString = `export const test1: string[][] = [\n`;
      for (const row of newCells) {
        codeString += ` [${row.map(cell => `'${cell}'`).join(", ")}],\n`;
      }
      codeString += `];`;

      setCode(codeString);
    },
    [setCode]
  );

  const handleColorChange = newColor => {
    setColor(newColor.hex);
    setMode("");
  };

  const handleCellClick = (row, col) => {
    const newCells = cells.map(rowCells => [...rowCells]);

    if (mode === MODES.eraser) {
      newCells[row][col] = defaultColor;
    } else if (mode !== MODES.drag) {
      newCells[row][col] = color;
    }

    setCells(newCells);
    updateCode(newCells);
  };

  const handleMouseDown = (row, col) => {
    setIsMouseDown(true);
    handleCellClick(row, col);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (row, col, e) => {
    if (isMouseDown && e.buttons === 1) {
      handleCellClick(row, col);
    }
  };

  const shiftGrid = (cols, rows) => {
    const newCells = Array.from({ length: 16 }, () =>
      Array(16).fill(DEFAULT_CELLS_COLOR)
    );
    for (let row = 0; row < 16; row++) {
      for (let col = 0; col < 16; col++) {
        const newRow = (row + rows + 16) % 16;
        const newCol = (col + cols + 16) % 16;
        newCells[newRow][newCol] = cells[row][col];
      }
    }
    setCells(newCells);
  };

  const handleGridMouseDown = e => {
    if (mode === MODES.drag) {
      setDraggingGrid(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    } else if (mode === MODES.eraser) {
      setDraggingGrid(false);
    }
  };

  const handleGridMouseUp = () => {
    setDraggingGrid(false);
  };

  const handleGridMouseMove = e => {
    if (draggingGrid && e.buttons === 1) {
      const dx = e.clientX - lastMousePosition.x;
      const dy = e.clientY - lastMousePosition.y;

      const cellWidth = 16;
      const cellHeight = 16;

      const cols = Math.floor(dx / cellWidth);
      const rows = Math.floor(dy / cellHeight);

      if (cols !== 0 || rows !== 0) {
        shiftGrid(cols, rows);
        setLastMousePosition({
          x: lastMousePosition.x + cols * cellWidth,
          y: lastMousePosition.y + rows * cellHeight,
        });
      }
    }
  };

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

  const applyColorToAll = () => {
    const newCells = Array.from({ length: 16 }, () => Array(16).fill(color));

    setCells(newCells);
    setDefaultColor(color);
    setMode("");

    updateCode(newCells);
  };

  const handleModeChange = newMode => {
    setMode(prevMode => (prevMode === newMode ? "" : newMode));
  };

  const resetToDefault = () => {
    const newCells = Array.from({ length: 16 }, () =>
      Array(16).fill(DEFAULT_CELLS_COLOR)
    );
    setCells(newCells);
    setColor(DEFAULT_COLOR);
    setDefaultColor(DEFAULT_CELLS_COLOR);
    setMode("");

    updateCode(newCells);
  };

  return (
    <div className="flex flex-col h-auto">
      <div className="flex-grow flex xl:flex-row">
        <div className="flex xl:flex-row gap-6 flex-col items-center justify-around w-full py-10">
          <div className="bg-neutral-800 p-5 rounded-3xl shadow-lg">
            <div
              className="w-64 h-64 grid grid-cols-16"
              onMouseDown={handleGridMouseDown}
              onMouseUp={handleGridMouseUp}
              onMouseMove={handleGridMouseMove}
            >
              {renderCells()}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <SketchPicker color={color} onChange={handleColorChange} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-around m-4">
        <label
          htmlFor="dragMode"
          className="inline-flex items-center mr-2 text-neutral-200 whitespace-nowrap"
        >
          <input
            type="checkbox"
            id="dragMode"
            className="form-checkbox"
            checked={mode === MODES.drag}
            onChange={() => handleModeChange(MODES.drag)}
          />
          <span className="ml-2">
            <i className="bi bi-arrows-move"></i> Move
          </span>
        </label>
        <div className="flex items-center whitespace-nowrap">
          <button
            className="bg-neutral-700 text-neutral-100 px-2 py-1 rounded hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all duration-200 ease-in-out shadow-md"
            onClick={applyColorToAll}
          >
            <i className="bi bi-paint-bucket"></i>
          </button>
          <span className="ml-2 text-neutral-200">Background</span>
          <div
            className="ml-2 w-6 h-6 rounded-full border border-gray-300 shadow-inner"
            style={{ backgroundColor: color }}
          ></div>
        </div>

        <label className="inline-flex items-center text-neutral-200 whitespace-nowrap">
          <input
            type="checkbox"
            checked={mode === MODES.eraser}
            onChange={() => handleModeChange(MODES.eraser)}
          />
          <span className="ml-2">
            <i className="bi bi-eraser"></i> Erase
          </span>
        </label>
        <div className="whitespace-nowrap">
          <button
            className="bg-neutral-700 text-neutral-100 px-2 py-1 rounded hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all duration-200 ease-in-out shadow-md"
            onClick={resetToDefault}
          >
            <i className="bi bi-arrow-counterclockwise"></i>
          </button>
          <span className="ml-2 text-neutral-200">Default</span>
        </div>
      </div>
      <hr className="border-neutral-800 mt-10 mb-16" />
      <div className="text-xs text-neutral-200 px-5 md:px-0 mx-0 xl:mx-14">
        <h3 className="mb-2 text-neutral-400">How to use:</h3>
        <p className="pb-1">
          <span className="text-neutral-100">Move:</span> Click and drag the
          grid to reposition the avatar design.
        </p>
        <p className="pb-1">
          <span className="text-neutral-100">Background:</span> Click the button
          to set the currently selected color as the background for all cells.
        </p>
        <p className="pb-1">
          <span className="text-neutral-100">Erase:</span> Enable the eraser
          tool to remove color from a cell, reverting it to the default
          background color.
        </p>
        <p>
          <span className="text-neutral-100">Default:</span> Click the button to
          reset the entire grid to the default background color, clearing the
          avatar design.
        </p>
      </div>
    </div>
  );
};

export default AvatarDesign;
