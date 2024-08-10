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
      className={`p-2 mb-2 bg-white rounded shadow cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {metric.name}
    </div>
  );
};

export default DraggableMetric;
