// pages/api/campaigns.js

export default function handler(req, res) {
  const campaigns = [
    {
      id: 1,
      name: "Campaign Alpha",
      metrics: [
        {
          metric: "Impressions",
          values: [
            { month: "January", value: 12000 },
            { month: "February", value: 15000 },
            { month: "March", value: 11000 },
            { month: "April", value: 14000 },
          ],
        },
        {
          metric: "CTR",
          values: [
            { month: "January", value: 0.02 },
            { month: "February", value: 0.025 },
            { month: "March", value: 0.018 },
            { month: "April", value: 0.022 },
          ],
        },
        {
          metric: "CPA",
          values: [
            { month: "January", value: 5 },
            { month: "February", value: 4.5 },
            { month: "March", value: 6 },
            { month: "April", value: 5.2 },
          ],
        },
        {
          metric: "Conversions",
          values: [
            { month: "January", value: 200 },
            { month: "February", value: 250 },
            { month: "March", value: 180 },
            { month: "April", value: 220 },
          ],
        },
        {
          metric: "Cost",
          values: [
            { month: "January", value: 1000 },
            { month: "February", value: 1200 },
            { month: "March", value: 900 },
            { month: "April", value: 1100 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Campaign Beta",
      metrics: [
        {
          metric: "Impressions",
          values: [
            { month: "January", value: 9000 },
            { month: "February", value: 12000 },
            { month: "March", value: 10000 },
            { month: "April", value: 13000 },
          ],
        },
        {
          metric: "CTR",
          values: [
            { month: "January", value: 0.03 },
            { month: "February", value: 0.022 },
            { month: "March", value: 0.027 },
            { month: "April", value: 0.025 },
          ],
        },
        {
          metric: "CPA",
          values: [
            { month: "January", value: 6 },
            { month: "February", value: 5 },
            { month: "March", value: 5.5 },
            { month: "April", value: 6.1 },
          ],
        },
        {
          metric: "Conversions",
          values: [
            { month: "January", value: 180 },
            { month: "February", value: 230 },
            { month: "March", value: 190 },
            { month: "April", value: 210 },
          ],
        },
        {
          metric: "Cost",
          values: [
            { month: "January", value: 950 },
            { month: "February", value: 1150 },
            { month: "March", value: 1000 },
            { month: "April", value: 1200 },
          ],
        },
      ],
    },
  ];

  res.status(200).json(campaigns);
}
