import React, { useState } from "react";
import AvatarDesign from "../components/AvatarDesign";
import AvatarCode from "../components/AvatarCode";
import { DEFAULT_CODE, DEFAULT_CELLS_COLOR } from "../constants/const";

const MainScreen = () => {
  const [cells, setCells] = useState(Array(256).fill(DEFAULT_CELLS_COLOR));
  const [code, setCode] = useState(DEFAULT_CODE);

  return (
    <div className="bg-neutral-800 flex flex-col min-h-screen">
      <div className="container mx-auto flex-grow">
        <h1 className="text-4xl font-bold pt-6 mb-3">Headline</h1>
        <p className="mb-6">
          Some text below the headline. This can be a description or any other
          content.
        </p>
        <hr />
        <div className="flex flex-col lg:flex-row my-6">
          <div className="lg:w-1/2 lg:pr-4">
            <div className="bg-gray-200 h-full">
              <AvatarCode code={code} />
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-4">
            <div className="bg-gray-300 h-full">
              <AvatarDesign
                cells={cells}
                setCells={setCells}
                setCode={setCode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
