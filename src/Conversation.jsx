import React from "react";

const Conversation = () => {
  return (
    <div className="h-screen w-screen p-4 flex justify-center">
      <div className="w-1/2">
        <header className="bg-white rounded-xl w-full h-20 p-2 px-4 flex items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 h-12 w-12 rounded-full"></div>
            <h2 className="text-2xl text-black">Elvis</h2>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Conversation;
