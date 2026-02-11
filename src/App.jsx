import React, { useState } from "react";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Sidebar from "./components/ui/Sidebar";

const App = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  return (
    <>
      <div className="h-screen flex flex-col">
        {/* top */}
        <div className="flex flex-1 overflow-hidden">
          {/* left panel-chat */}
          <div className="w-1/3 border-r p-4 flex flex-col">
            <h1 className="text-lg font-bold mb-4">AI Chat</h1>
            <textarea className="border p-2 rounded-md flex-1" name="" id="" />
            <Button label="Generate UI" />
          </div>

          {/* right panel-code */}
          <div className="w-2/3 p-4 flex flex-col">
            <h1 className="text-lg font-bold mb-4">Generated Code</h1>
            <textarea
              className="border p-2 rounded-md flex-1 font-mono"
              value={generatedCode}
              onChange={(e) => setGeneratedCode(e.target.value)}
              name=""
              id=""
            />
          </div>
        </div>

        {/* bottom-live preview */}
        <div className="h-1/3 border-t p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-4">Live Preview</h2>
          <div className="flex gap-4">
            {/* <Sidebar /> */}
            <Card title="Preview Card"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
