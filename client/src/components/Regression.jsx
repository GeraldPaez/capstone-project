// import DashboardBox from "@/components/DashboardBox";
// import FlexBetween from "@/components/FlexBetween";
// import { useGetKpisQuery } from "@/state/api";
// import { Box, Button, Typography, useTheme } from "@mui/material";
// import React, { useMemo, useState } from "react";
// import { ResponsiveLine } from "@nivo/line";
// import regression, { DataPoint } from "regression";

// const Predictions = () => {
//   const { palette } = useTheme();
//   const [isPredictions, setIsPredictions] = useState(false);
//   const { data: kpiData } = useGetKpisQuery();

//   const formattedData = useMemo(() => {
//     if (!kpiData) return [];
//     const monthData = kpiData[0].monthlyData;

//     const formatted = monthData.map(({ revenue }, i) => {
//       return [i, revenue];
//     });

//     const regressionLine = regression.linear(formatted);

//     return monthData.map(({ month, revenue }, i) => {
//       return {
//         x: i,
//         month,
//         "Actual Revenue": revenue,
//         "Regression Line": regressionLine.points[i][1],
//         "Predicted Revenue": regressionLine.predict(i + 12)[1],
//       };
//     });
//   }, [kpiData]);

//   const chartData = [
//     {
//       id: "Actual Revenue",
//       data: formattedData.map((dataPoint) => ({
//         x: dataPoint.x,
//         y: dataPoint["Actual Revenue"],
//       })),
//     },
//     {
//       id: "Regression Line",
//       data: formattedData.map((dataPoint) => ({
//         x: dataPoint.x,
//         y: dataPoint["Regression Line"],
//       })),
//     },
//     isPredictions && {
//       id: "Predicted Revenue",
//       data: formattedData.map((dataPoint) => ({
//         x: dataPoint.x + 12,
//         y: dataPoint["Predicted Revenue"],
//       })),
//     },
//   ].filter(Boolean);

//   return (
//     <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
//       <FlexBetween m="1rem 2.5rem" gap="1rem">
//         <Box>
//           <Typography variant="h3">Revenue and Predictions</Typography>
//           <Typography variant="h6">
//             charted revenue and predicted revenue based on a simple linear
//             regression model
//           </Typography>
//         </Box>
//         <Button
//           onClick={() => setIsPredictions(!isPredictions)}
//           sx={{
//             color: palette.grey[900],
//             backgroundColor: palette.grey[700],
//             boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
//           }}
//         >
//           Show Predicted Revenue for Next Year
//         </Button>
//       </FlexBetween>
//       <ResponsiveLine
//         data={chartData}
//         margin={{ top: 20, right: 75, bottom: 80, left: 20 }}
//         xScale={{ type: "linear" }}
//         yScale={{ type: "linear", min: 12000, max: 26000 }}
//         curve="monotoneX"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           orient: "bottom",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "Month",
//           legendOffset: 36,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           orient: "left",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: -90,
//           legend: "Revenue in USD",
//           legendOffset: -40,
//           legendPosition: "middle",
//           format: (v) => `$${v}`,
//         }}
//         enablePoints={false}
//         enableGridX={false}
//         enableGridY={false}
//         enableSlices="x"
//         colors={(point) => palette[point.id.toLowerCase()].main}
//         pointSize={10}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabel="y"
//         pointLabelYOffset={-12}
//         useMesh
//         legends={[
//           {
//             anchor: "top",
//             direction: "row",
//             justify: false,
//             translateX: 0,
//             translateY: -30,
//             itemsSpacing: 0,
//             itemDirection: "left-to-right",
//             itemWidth: 80,
//             itemHeight: 20,
//             itemOpacity: 0.75,
//             symbolSize: 12,
//             symbolShape: "circle",
//             symbolBorderColor: "rgba(0, 0, 0, .5)",
//             onClick: () => {},
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
//     </DashboardBox>
//   );
// };

// export default Predictions;
