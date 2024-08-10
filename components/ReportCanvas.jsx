import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ChartComponent from "./ChartComponent";
import { colorSchemes } from "../helpers/ColorMaps";
import axios from "axios";
import ReportSelection from "./Sub/ReportSelection";

const ReportCanvas = () => {
  const [metrics, setMetrics] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [colorScheme, setColorScheme] = useState(colorSchemes[0]);

  useEffect(() => {
    axios
      .get("/api/campaigns")
      .then((response) => {
        setCampaigns(response.data);
        setSelectedCampaign(response.data[0].id); // Set the first campaign as default
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
    }
  }, [selectedCampaign]);

  const [{ isOver }, drop] = useDrop({
    accept: "METRIC",
    drop: (item) => addMetricToCanvas(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addMetricToCanvas = (metric) => {
    if (!metrics.find((m) => m.id === metric.id)) {
      setMetrics((prevMetrics) => [...prevMetrics, metric]);
    }
  };

  const removeMetric = (metricId) => {
    setMetrics(metrics.filter((metric) => metric.id !== metricId));
  };

  const selectedCampaignData =
    campaigns.find((campaign) => campaign.id === selectedCampaign) || {};

  const selectedColorScheme =
    colorSchemes.find((color) => color.name === colorScheme) || colorSchemes[0];

  return (
    <main
      ref={drop}
      className={`w-3/4 p-4 max-h-screen border-dashed border-4 border-gray-50 ${
        isOver ? "border-dashed border-4 border-blue-400" : ""
      }`}
    >
      <ReportSelection
        selectedCampaign={selectedCampaign}
        setSelectedCampaign={setSelectedCampaign}
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
        chartType={chartType}
        setChartType={setChartType}
        campaigns={campaigns}
        metrics={metrics}
        removeMetric={removeMetric}
      />

      {metrics.length === 0 ? (
        <p className="text-gray-500 text-center mt-40">
          Drag metrics here to start building your report
        </p>
      ) : (
        <div className="mt-5">
          <ChartComponent
            metrics={metrics}
            chartType={chartType}
            colorScheme={selectedColorScheme}
            campaignData={selectedCampaignData}
          />
        </div>
      )}
    </main>
  );
};

export default ReportCanvas;
