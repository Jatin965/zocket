import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ChartComponent from "./ChartComponent";
import { colorSchemes } from "../helpers/ColorMaps";
import axios from "axios";

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

  const colorSchemeChangeHandler = (e) => {
    setColorScheme(e.target.value);
  };

  const selectedCampaignData =
    campaigns.find((campaign) => campaign.id === selectedCampaign) || {};

  const selectedColorScheme = colorSchemes.find(
    (color) => color.name === colorScheme
  );

  return (
    <main
      ref={drop}
      className={`w-3/4 p-4 bg-gray-50 max-h-screen ${
        isOver ? "border-dashed border-4 border-blue-400" : ""
      }`}
    >
      <h2 className="text-lg font-bold mb-4">Report Canvas</h2>

      <div className="flex mb-4">
        <div className="mr-4">
          <label className="block font-bold mb-1">Select Campaign:</label>
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(Number(e.target.value))}
            className="p-2 border rounded"
          >
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mr-4">
          <label className="block font-bold mb-1">Chart Type:</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </div>

        <div>
          <label className="block font-bold mb-1">Color Scheme:</label>
          <select
            value={colorScheme.name}
            onChange={colorSchemeChangeHandler}
            className="p-2 border rounded"
          >
            {colorSchemes.map((color) => (
              <option key={color.name} value={color.name}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {metrics.length === 0 ? (
        <p className="text-gray-500">
          Drag metrics here to start building your report
        </p>
      ) : (
        <ChartComponent
          metrics={metrics}
          chartType={chartType}
          colorScheme={selectedColorScheme}
          campaignData={selectedCampaignData}
        />
      )}
    </main>
  );
};

export default ReportCanvas;
