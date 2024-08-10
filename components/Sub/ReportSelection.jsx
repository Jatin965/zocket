import React from "react";
import { colorSchemes } from "../../helpers/ColorMaps";

const ReportSelection = ({
  selectedCampaign,
  setSelectedCampaign,
  colorScheme,
  setColorScheme,
  chartType,
  setChartType,
  campaigns,
}) => {
  return (
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
            onChange={(e) => setColorScheme(e.target.value)}
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
  );
};

export default ReportSelection;
