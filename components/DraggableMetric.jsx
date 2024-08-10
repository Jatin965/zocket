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
      className={`flex items-center p-2 mb-4  border border-[#0052f1] bg-[rgba(0,82,241,0.1)] rounded-xl cursor-grab  ${
        isDragging ? "opacity-80 cursor-grabbing" : "opacity-100"
      } hover:shadow-sm transition-shadow duration-200 ease-in-out`}
    >
      <div className="flex-shrink-0 p-2 bg-blue-10 rounded-md">
        <svg
          className="w-6 h-6 text-[#212121]"
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
        <div className="text-lg font-medium text-[#212121]">{metric.name}</div>
      </div>
    </div>
  );
};

export default DraggableMetric;
