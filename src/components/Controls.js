import { MODES } from "../constants/const";

const Controls = ({
  color,
  mode,
  handleModeChange,
  applyColorToAll,
  resetToDefault,
}) => {
  return (
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
  );
};

export default Controls;
