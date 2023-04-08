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
  const [dragMode, setDragMode] = useState(false);
  const [eraserMode, setEraserMode] = useState(false);

  const handleColorChange = newColor => {
    setColor(newColor.hex);
  };

  const handleCellClick = index => {
    if (eraserMode) {
      eraser(index);
    } else if (!dragMode) {
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
    if (!dragMode && isMouseDown && e.buttons === 1) {
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
    if (dragMode) {
      setDraggingGrid(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
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
      return (
        <div
          key={index}
          className="w-4 h-4 border border-gray-300"
          style={{ backgroundColor: cellColor }}
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
  };

  const eraser = index => {
    const newCells = [...cells];
    newCells[index] = defaultColor;
    setCells(newCells);
  };

  const handleModeChange = (mode, e) => {
    if (mode === MODES.drag) {
      setDragMode(e.target.checked);
      if (e.target.checked) {
        setEraserMode(false);
      }
    } else if (mode === MODES.eraser) {
      setEraserMode(e.target.checked);
      if (e.target.checked) {
        setDragMode(false);
      }
    }
  };

  const resetToDefault = () => {
    setCells(Array(256).fill(DEFAULT_CELLS_COLOR));
    setColor(DEFAULT_COLOR);
    setDefaultColor(DEFAULT_CELLS_COLOR);
  };

  return (
    <div className="flex flex-col h-screen sm:h-auto">
      <div className="flex-grow flex">
        <div className="flex lg:flex-row flex-col items-center justify-around w-full py-10">
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
            checked={dragMode}
            onChange={e => handleModeChange(MODES.drag, e)}
          />
          <span className="ml-2">Enable drag mode</span>
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={applyColorToAll}
        >
          Apply color to all
        </button>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={eraserMode}
            onChange={e => handleModeChange(MODES.eraser, e)}
          />
          <span className="ml-2">Enable Eraser Mode</span>
        </label>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          onClick={resetToDefault}
        >
          Back to Default
        </button>
      </div>
    </div>
  );
};

export default AvatarDesign;
