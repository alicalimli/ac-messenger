import React from "react";

import { IoIosSend } from "react-icons/io";

const Conversation = () => {
  return (
    <div className="h-screen w-screen p-4 flex justify-center">
      <div className="w-1/2 flex flex-col">
        <header className="bg-white rounded-xl w-full h-20 p-2 px-4 flex items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 h-12 w-12 rounded-full"></div>
            <h2 className="text-2xl text-black">Elvis</h2>
          </div>
        </header>

        <footer className="mt-auto bg-white rounded-xl w-full h-16 p-2 flex items-center">
          <form action="#" className="w-full flex items-center gap-1">
            <input
              required
              type="text"
              placeholder="Message here"
              className="p-2 px-4 w-full"
            />
            <button className="rounded-xl ml-auto w-12 h-12 bg-blue-600 flex items-center justify-center">
              <IoIosSend className="text-white text-2xl" />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default Conversation;
