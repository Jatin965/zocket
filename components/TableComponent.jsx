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
    <div>
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

      {/* CSV Download Link */}
      <div className="mt-4">
        <CSVLink
          data={tableRows}
          headers={csvHeaders}
          filename="metrics-report.csv"
          className="text-blue-600 hover:underline"
        >
          Download CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default TableComponent;
