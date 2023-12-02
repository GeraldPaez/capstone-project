// // components/TimeSeriesChart.js
// import React from "react";
// import { ResponsiveLine } from "nivo";

// const TimeSeriesChart = ({ data }) => {
//   return (
//     <div style={{ height: "300px" }}>
//       <ResponsiveLine
//         data={[
//           {
//             id: "Time Series Data",
//             data: data.map((entry) => ({ x: entry.timestamp, y: entry.value })),
//           },
//         ]}
//         margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
//         xScale={{ type: "time", format: "%Y-%m-%d", useUTC: false }}
//         yScale={{
//           type: "linear",
//           min: "auto",
//           max: "auto",
//           stacked: true,
//           reverse: false,
//         }}
//         curve="monotoneX"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           orient: "bottom",
//           format: "%Y-%m-%d",
//           tickValues: "every 1 month",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 45,
//         }}
//         axisLeft={{
//           orient: "left",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//         }}
//         colors={{ scheme: "category10" }}
//         pointSize={10}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabel="y"
//         pointLabelYOffset={-12}
//         enableArea={true}
//         useMesh={true}
//         legends={[
//           {
//             anchor: "bottom-right",
//             direction: "column",
//             justify: false,
//             translateX: 100,
//             translateY: 0,
//             itemsSpacing: 0,
//             itemDirection: "left-to-right",
//             itemWidth: 80,
//             itemHeight: 20,
//             itemOpacity: 0.75,
//             symbolSize: 12,
//             symbolShape: "circle",
//             symbolBorderColor: "rgba(0, 0, 0, .5)",
//             effects: [
//               {
//                 on: "hover",
//                 style: {
//                   itemBackground: "rgba(0, 0, 0, .03)",
//                   itemOpacity: 1,
//                 },
//               },
//             ],
//           },
//         ]}
//       />
//     </div>
//   );
// };

// export default TimeSeriesChart;
