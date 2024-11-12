  "use client";

  import { useState } from "react";

  const ContentTitle = ({ title, setTimeWindow, options }) => {
    const [activeButton, setActiveButton] = useState(options[0].value); 

    const handleOptionChange = (value) => {
      setActiveButton(value);
      setTimeWindow(value); 
    };

    return (
      <div className="p-6 flex gap-6 lg:flex-row  md:flex-col flex-col w-fit">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionChange(option.value)}
              className={`px-8 py-2 transition-colors duration-200 ${
                activeButton === option.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-400 focus:outline-none`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  export default ContentTitle;
