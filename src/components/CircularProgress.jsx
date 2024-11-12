// components/CircularProgress.js

import React from "react";
import { CircularProgress } from "@nextui-org/react";

export default function Circularprogress({ progress }) {
  // Function to determine the color based on progress value
  const getColor = (progress) => {
    if (progress <= 30) return "danger";   // Red for low progress
    if (progress <= 70) return "warning";  // Orange for medium progress
    return "success";                      // Green for high progress
  };

  return (
    <CircularProgress
      aria-label="Loading..."
      size="lg"
      value={progress}
      color={getColor(progress)} // Set color based on progress value
      showValueLabel={true}
      className="absolute top-[2px] left-[2px] z-20 bg-white text-black dark:text-white dark:bg-black rounded-full" // Ensure it's above other content
    />
  );
}
  