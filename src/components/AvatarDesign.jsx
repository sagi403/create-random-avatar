import { useState } from "react";
import { SketchPicker } from "react-color";

const AvatarDesign = () => {
  const [color, setColor] = useState("#000000");
  const [cells, setCells] = useState(Array(256).fill("#ffffff"));
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleColorChange = newColor => {
    setColor(newColor.hex);
  };

  const handleCellClick = index => {
    const newCells = [...cells];
    newCells[index] = color;
    setCells(newCells);
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

  return (
    <div className="flex flex-col md:flex-row h-screen md:h-auto">
      <div className="md:w-1/2 flex items-center justify-center p-4">
        <div className="w-64 h-64 grid grid-cols-16">{renderCells()}</div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-4">
        <SketchPicker color={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default AvatarDesign;
