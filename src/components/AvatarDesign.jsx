import { useState } from "react";
import { SketchPicker } from "react-color";

const DEFAULT_CELLS_COLOR = "#ffffff";
const DEFAULT_COLOR = "#000000";
const MODES = {
  drag: "drag",
  eraser: "eraser",
};

const AvatarDesign = () => {
  const [defaultColor, setDefaultColor] = useState(DEFAULT_CELLS_COLOR);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [cells, setCells] = useState(Array(256).fill(DEFAULT_CELLS_COLOR));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [draggingGrid, setDraggingGrid] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState("");

  const handleColorChange = newColor => {
    setColor(newColor.hex);
    setMode("");
  };

  const handleCellClick = index => {
    if (mode === MODES.eraser) {
      eraser(index);
    } else if (mode !== MODES.drag) {
      const newCells = [...cells];
      newCells[index] = color;
      setCells(newCells);
    }
  };

  const handleMouseDown = index => {
    setIsMouseDown(true);
    handleCellClick(index);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (index, e) => {
    if (isMouseDown && e.buttons === 1) {
      handleCellClick(index);
    }
  };

  const shiftGrid = (cols, rows) => {
    const newCells = Array(256).fill("#ffffff");
    for (let i = 0; i < 256; i++) {
      const newRow = (Math.floor(i / 16) + rows + 16) % 16;
      const newCol = ((i % 16) + cols + 16) % 16;
      newCells[newRow * 16 + newCol] = cells[i];
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
    return cells.map((cellColor, index) => {
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
          key={index}
          className="w-4 h-4 border border-gray-300"
          style={cellStyle}
          onMouseDown={() => handleMouseDown(index)}
          onMouseUp={handleMouseUp}
          onMouseMove={e => handleMouseMove(index, e)}
          onDragStart={e => e.preventDefault()}
        ></div>
      );
    });
  };

  const applyColorToAll = () => {
    const newCells = Array(256).fill(color);
    setCells(newCells);
    setDefaultColor(color);
    setMode("");
  };

  const eraser = index => {
    const newCells = [...cells];
    newCells[index] = defaultColor;
    setCells(newCells);
  };

  const handleModeChange = newMode => {
    setMode(prevMode => (prevMode === newMode ? "" : newMode));
  };

  const resetToDefault = () => {
    setCells(Array(256).fill(DEFAULT_CELLS_COLOR));
    setColor(DEFAULT_COLOR);
    setDefaultColor(DEFAULT_CELLS_COLOR);
    setMode("");
  };

  return (
    <div className="flex flex-col h-auto">
      <div className="flex-grow flex xl:flex-row">
        <div className="flex xl:flex-row gap-6 flex-col items-center justify-around w-full py-10">
          <div className="bg-neutral-500 p-8 rounded-3xl">
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

      <div className="flex items-center justify-around m-4">
        <label htmlFor="dragMode" className="inline-flex items-center mr-2">
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
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={applyColorToAll}
          >
            <i className="bi bi-paint-bucket"></i>
          </button>
          <span className="ml-2">Background</span>
          <div
            className="ml-2 w-6 h-6 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          ></div>
        </div>

        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={mode === MODES.eraser}
            onChange={() => handleModeChange(MODES.eraser)}
          />
          <span className="ml-2">
            <i className="bi bi-eraser"></i> Erase
          </span>
        </label>
        <div>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={resetToDefault}
          >
            {" "}
            <i className="bi bi-arrow-counterclockwise"></i>
          </button>
          <span className="ml-2">Default</span>
        </div>
      </div>
    </div>
  );
};

export default AvatarDesign;
