import { useState, useCallback } from "react";
import { SketchPicker } from "react-color";
import { DEFAULT_CELLS_COLOR, DEFAULT_COLOR, MODES } from "../constants/const";
import Grid from "./Grid";
import Controls from "./Controls";
import Helper from "./Helper";

const AvatarDesign = ({ cells, setCells, setCode }) => {
  const [defaultColor, setDefaultColor] = useState(DEFAULT_CELLS_COLOR);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [draggingGrid, setDraggingGrid] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState("");

  const updateCode = useCallback(
    newCells => {
      let codeString = `export const enterYourAvatarNameHere: string[][] = [\n`;
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
            <Grid
              cells={cells}
              handleMouseDown={handleMouseDown}
              handleMouseUp={handleMouseUp}
              handleMouseMove={handleMouseMove}
              handleGridMouseDown={handleGridMouseDown}
              handleGridMouseUp={handleGridMouseUp}
              handleGridMouseMove={handleGridMouseMove}
              mode={mode}
            />
          </div>
          <div className="flex flex-col justify-center">
            <SketchPicker color={color} onChange={handleColorChange} />
          </div>
        </div>
      </div>
      <Controls
        color={color}
        mode={mode}
        handleModeChange={handleModeChange}
        applyColorToAll={applyColorToAll}
        resetToDefault={resetToDefault}
      />
      <hr className="border-neutral-800 mt-10 mb-16" />
      <Helper />
    </div>
  );
};

export default AvatarDesign;
