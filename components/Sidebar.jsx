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
    <aside className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Metrics</h2>
      <div>
        {metrics.map((metric) => (
          <DraggableMetric key={metric.id} metric={metric} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
