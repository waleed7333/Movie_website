// src/app/movies/[id]/components/OverviewToggle.jsx

"use client";
import { useState } from "react";

const OverviewToggle = ({ overview }) => {
  const [showOverview, setShowOverview] = useState(false);

  return (
    <p className="mt-4 text-gray-900 dark:text-gray-300">
      {showOverview ? overview : `${overview.substring(0, 300)}...`}
      <button className="text-blue-500" onClick={() => setShowOverview(!showOverview)}>
        {showOverview ? "Read less" : "Read more"}
      </button>
    </p>
  );
};

export default OverviewToggle;
