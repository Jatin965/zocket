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

  const selectedColorScheme =
    colorSchemes.find((color) => color.name === colorScheme) || colorSchemes[0];

  return (
    <main
      ref={drop}
      className={`w-3/4 p-4 max-h-screen border-dashed border-4 border-gray-50 ${
        isOver ? "border-dashed border-4 border-blue-400" : ""
      }`}
    >
      <div className="p-4 border rounded-2xl border-solid border-[#e5e5e5] bg-white">
        <h2 className="mb-4 text-[#212121] text-2xl font-medium ">Report Canvas</h2>

        <div className="flex mb-4">
          <div className="mr-4">
            <label className="block font-medium text-gray-700 mb-2">
              Select Campaign:
            </label>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(Number(e.target.value))}
              className="p-2 pl-4 pr-4 min-w-[100px] bg-white rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mr-4">
            <label className="block font-medium text-gray-700 mb-2 ">
              Chart Type:
            </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="p-2 pl-4 pr-4 min-w-[100px] bg-white rounded-lg border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Color Scheme:
            </label>
            <select
              value={colorScheme.name}
              onChange={colorSchemeChangeHandler}
              className="p-2 pl-4 pr-4 min-w-[100px] bg-white rounded-lg border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {colorSchemes.map((color) => (
                <option key={color.name} value={color.name}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

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
