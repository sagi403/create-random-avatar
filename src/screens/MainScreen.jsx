import React from "react";
import AvatarDesign from "../components/AvatarDesign";

const MainScreen = () => {
  return (
    <div className="bg-neutral-800">
      <div className="container mx-auto h-screen">
        <h1 className="text-4xl font-bold pt-6 mb-3">Headline</h1>
        <p className="mb-6">
          Some text below the headline. This can be a description or any other
          content.
        </p>
        <hr />
        <div className="flex flex-col md:flex-row mt-6">
          <div className="w-full md:w-1/2 md:pr-4">
            <div className="bg-gray-200 h-full">
              Left column content goes here.
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <div className="bg-gray-300 h-full">
              <AvatarDesign />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
