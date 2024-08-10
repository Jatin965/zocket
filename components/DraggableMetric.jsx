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
      className={`flex items-center p-2 mb-4  border border-gray-200 rounded-md shadow-sm cursor-grab  ${
        isDragging ? "opacity-80 cursor-grabbing" : "opacity-100"
      } hover:shadow-sm transition-shadow duration-200 ease-in-out`}
      style={{ backgroundColor: "rgba(0, 52, 187, 0.05)" }}
    >
      <div className="flex-shrink-0 p-2 bg-blue-10 rounded-md">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8h16M4 16h16"
          ></path>
        </svg>
      </div>
      <div className="ml-4">
        <div className="text-lg font-semibold text-gray-800">{metric.name}</div>
      </div>
    </div>
  );
};

export default DraggableMetric;
