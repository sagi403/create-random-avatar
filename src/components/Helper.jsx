const Helper = () => {
  return (
    <div className="text-xs text-neutral-200 px-5 md:px-0 mx-0 xl:mx-14">
      <h3 className="mb-2 text-neutral-400">How to use:</h3>
      <p className="pb-1">
        <span className="text-neutral-100">Move:</span> Click and drag the grid
        to reposition the avatar design.
      </p>
      <p className="pb-1">
        <span className="text-neutral-100">Background:</span> Click the button
        to set the currently selected color as the background for all cells.
      </p>
      <p className="pb-1">
        <span className="text-neutral-100">Erase:</span> Enable the eraser tool
        to remove color from a cell, reverting it to the default background
        color.
      </p>
      <p>
        <span className="text-neutral-100">Default:</span> Click the button to
        reset the entire grid to the default background color, clearing the
        avatar design.
      </p>
    </div>
  );
};

export default Helper;
