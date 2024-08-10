import React from "react";
import DraggableMetric from "./DraggableMetric";

const metrics = [
  { id: 1, name: "Impressions" },
  { id: 2, name: "CTR" },
  { id: 3, name: "CPA" },
  { id: 4, name: "Conversions" },
  { id: 5, name: "Cost" },
];

const Sidebar = () => {
  return (
    <aside className="w-1/4 max-h-screen">
      <div className="p-4 border rounded-2xl border-solid border-[#e5e5e5] bg-white mt-5 ml-4">
        <h2 className="mb-4 text-[#212121] text-2xl font-medium">Metrics</h2>
        <div>
          {metrics.map((metric) => (
            <DraggableMetric key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
