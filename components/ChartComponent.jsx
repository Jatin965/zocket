import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import TableComponent from "./TableComponent";

const ChartComponent = ({
  metrics,
  campaignData,
  chartType = "bar",
  colorScheme,
}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const datasets = metrics.map((metric) => {
        const dataMetric = campaignData?.metrics?.find(
          (m) => m.metric === metric.name
        );
        const data = dataMetric ? dataMetric.values.map((item) => item.value) : [];
        const colors = colorScheme?.colors[metric.name.toLowerCase()] || {
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
        };

        return {
          label: metric.name,
          data,
          backgroundColor: colors.backgroundColor,
          borderColor: colors.borderColor,
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
        };
      });

      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: chartType,
          data: {
            labels: campaignData?.metrics
              ? campaignData.metrics[0].values.map((item) => item.month)
              : [],
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [metrics, chartType, colorScheme, campaignData]);

  return (
    <div className="max-h-500 mb-3">
      <canvas
        style={{ maxHeight: "350px" }}
        ref={chartRef}
        height="300"
        className="border rounded-2xl border-solid border-[#e5e5e5] bg-white pt-6 pb-6 pl-4 pr-4"
      ></canvas>

      {/* Table below the chart */}
      <TableComponent metrics={metrics} campaignData={campaignData} />
    </div>
  );
};

export default ChartComponent;
