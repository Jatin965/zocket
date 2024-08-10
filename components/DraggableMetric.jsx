"use client";
import React from "react";
import { useDrag } from "react-dnd";

const DraggableMetric = ({ metric }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "METRIC",
    item: metric,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      draggable
      className={`flex items-center p-2 mb-4  border border-[#0075ff] bg-[rgba(0,82,241,0.1)] rounded-xl cursor-grab  ${
        isDragging ? "opacity-80 cursor-grabbing" : "opacity-100"
      } hover:shadow-sm transition-shadow duration-200 ease-in-out`}
    >
      <div className="flex-shrink-0 p-2 rounded-md">
        <svg
          className="w-6 h-6 text-[#212121  ]"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1"
          />
        </svg>
      </div>
      <div className="ml-4">
        <div className="text-lg font-medium text-[#212121]">{metric.name}</div>
      </div>
    </div>
  );
};

export default DraggableMetric;
