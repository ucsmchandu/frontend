import React, { useState, useEffect } from "react";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Sidebar from "./components/ui/Sidebar";
import axios from "axios";
import Preview from "./Preview";

const App = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [explanation, setExplanation] = useState("");
  const [plan, setPlan] = useState(null);
  // const testPlan = {
  //   type: "create",
  //   components: [
  //     {
  //       name: "Sidebar",
  //       props: {
  //         header: "Dashboard Menu",
  //         items: [
  //           { label: "Overview" },
  //           { label: "Analytics" },
  //           { label: "Reports" },
  //           { label: "Settings" },
  //         ],
  //       },
  //     },
  //     {
  //       name: "Card",
  //       props: {
  //         title: "Total Users",
  //         content: "1,234",
  //         description: "Active users this month.",
  //       },
  //     },
  //     {
  //       name: "Card",
  //       props: {
  //         title: "Revenue",
  //         content: "$56,789",
  //         description: "Revenue generated this quarter.",
  //       },
  //     },
  //     {
  //       name: "Card",
  //       props: {
  //         title: "New Signups",
  //         content: "45",
  //         description: "Users joined in last 24 hours.",
  //       },
  //     },
  //   ],
  // };

  // useEffect(()=>{
  //   setPlan(testPlan)
  // },[])

  const handleGenerate = async () => {
    if (!userInput) {
      alert("input required");
      return;
    }
    const res = await axios.post("http://localhost:3000/generate", {
      message: userInput,
      previousCode: generatedCode,
    });

    setGeneratedCode(res.data.code);
    setExplanation(res.data.explanation);
    setPlan(res.data.plan);
    console.log(res.data.code);
    console.log(res.data.explanation);
  };
  return (
    <>
      <div className="h-screen flex flex-col bg-gray-100">
        {/* header */}
        <div className="px-6 py-4 bg-white shadow-sm border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            AI UI Generator
          </h1>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT PANEL - CHAT */}
          <div className="w-1/3 bg-white border-r flex flex-col p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              AI Chat
            </h2>

            <textarea
              className="flex-1 border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe the UI you want..."
            />

            <div className="mt-4">
              <Button onClick={handleGenerate} label="Generate UI" />
            </div>

            {/* Explanation */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                AI Explanation
              </h3>
              <div className="text-xs text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded-md max-h-40 overflow-auto">
                {explanation || "Explanation will appear here..."}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - CODE */}
          <div className="w-2/3 bg-white flex flex-col p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Generated Plan (JSON)
            </h2>

            <textarea
              className="flex-1 border rounded-lg p-3 font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={generatedCode}
              onChange={(e) => setGeneratedCode(e.target.value)}
            />
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <div className="h-1/3 bg-white border-t p-6 overflow-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Live Preview
          </h2>

          <div className="bg-gray-50 p-6 rounded-xl shadow-inner min-h-[150px]">
            <Preview plan={plan} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
