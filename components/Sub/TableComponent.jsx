import React from "react";
import { CSVLink } from "react-csv";

const TableComponent = ({ metrics, campaignData }) => {
  // Prepare data for the table
  const tableData = campaignData?.metrics?.reduce((acc, metric) => {
    metric.values.forEach(({ month, value }) => {
      if (!acc[month]) acc[month] = { month };
      acc[month][metric.metric] = value;
    });
    return acc;
  }, {});

  const tableRows = Object.values(tableData || {});

  // Prepare data for CSV download
  const csvHeaders = [
    { label: "Month", key: "month" },
    ...metrics.map((metric) => ({ label: metric.name, key: metric.name })),
  ];

  return (
    <div className="border rounded-2xl border-solid border-[#e5e5e5] bg-white p-4 mt-5">
      {/* CSV Download Link */}
      <div className="flex justify-between items-center mt-4 mb-5 ">
        <h4 className="ml-5 text-[#212121] text-2xl font-medium">Selected Metrics Data</h4>
        <div className="mt-2 mr-5">
          <CSVLink
            data={tableRows}
            headers={csvHeaders}
            filename="metrics-report.csv"
            className="inline-flex items-center px-8 py-3 text-white bg-[#0052f1] hover:bg-[#0052f1]-700 focus:outline-none focus:ring-2 focus:bg-[#0034BB] focus:ring-opacity-50 rounded-lg  text-sm font-medium"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>

      {/* Table below the chart */}
      {metrics.length > 0 && (
        <div className="max-h-400">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {csvHeaders.map((header) => (
                  <th
                    key={header.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableRows.map((row, index) => (
                <tr key={index}>
                  {csvHeaders.map((header) => (
                    <td
                      key={header.key}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {row[header.key] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
