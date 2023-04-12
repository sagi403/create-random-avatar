import React, { useState } from "react";
import AvatarDesign from "../components/AvatarDesign";
import AvatarCode from "../components/AvatarCode";
import { DEFAULT_CODE, DEFAULT_CELLS_COLOR } from "../constants/const";

const MainScreen = () => {
  const [cells, setCells] = useState(
    Array.from({ length: 16 }, () => Array(16).fill(DEFAULT_CELLS_COLOR))
  );
  const [code, setCode] = useState(DEFAULT_CODE);

  return (
    <div className="bg-neutral-900 flex flex-col min-h-screen lg:py-3">
      <div className="container mx-auto flex-grow">
        <h1 className="text-2xl pt-6 mb-3 text-neutral-100 px-5 md:px-0">
          Create <span className="text-lime-700">React Random Avatars</span>
        </h1>
        <div className="flex flex-col md:flex-row items-start md:items-center mb-6 justify-between">
          <p className="text-sm text-neutral-400 px-5 md:px-0 w-full md:w-3/5">
            A user-friendly tool that enables you to effortlessly design unique
            and engaging avatars. Replacing generic avatars and delivering
            better experiences for users. Supports React, ensuring seamless
            integration into your projects for an enhanced user experience.
          </p>
          <a
            href="https://github.com/sagi403/react-random-avatars"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 md:mr-14"
          >
            <button className="bg-neutral-100 text-neutral-800 text-xs px-2 py-1 rounded-sm hover:bg-neutral-200 mx-5 md:mx-0">
              <i className="bi bi-star"></i> react-random-avatars
            </button>
          </a>
        </div>
        <hr className="border-neutral-800" />
        <div className="flex flex-col lg:flex-row my-6">
          <div className="lg:w-1/2 lg:pr-4">
            <div className="h-full">
              <AvatarCode code={code} />
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-4">
            <div className="h-full">
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
