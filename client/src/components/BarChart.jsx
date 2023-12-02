import { ResponsiveBar } from "@nivo/bar";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import React from "react";

const BarChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();
  console.log("data", data);

  if (!data || isLoading) return "Loading...";

  const colors = ["#2ECC71", "#60A3D9", "#D4AC0D", "#C0392B"];
  const formattedData = Object.entries(data.salesByUnits).map(
    ([units, sales], i) => ({
      id: units,
      label: units,
      value: sales,
      color: colors[i],
    })
  );

  formattedData.sort((a, b) => b.value - a.value);

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsiveBar
        data={formattedData}
        theme={{
          // added
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[400],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[700],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.primary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[400],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[500],
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 20, bottom: 50, left: 60 }
            : { top: 40, right: 20, bottom: 80, left: 80 }
        }
        // keys={["Box", "Bundle", "Kilogram", "Piece"]}
        // indexBy={[sales]}
        padding={0.1}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        // colors={{ scheme: "category10" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", "1.6"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "units", // changed
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "", // changed
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableArcLinkLabels={!isDashboard}
        enableGridY={false}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        // legends={[
        //   {
        //     dataFrom: "keys",
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemTextColor: theme.palette.secondary[200],
        //     itemDirection: "left-to-right",
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemOpacity: 1,
        //           itemTextColor: theme.palette.secondary[200],
        //         },
        //       },
        //     ],
        //   },
        // ]}
        role="application"
        barAriaLabel={function (e) {
          return (
            e.id +
            ": " +
            e.formattedValue +
            " in your business: " +
            e.indexValue
          );
        }}
      />
      {/* <Typography variant="h6">
        {!isDashboard && "Total:"} ${data.yearlySalesTotal}
      </Typography> */}
    </Box>
  );
};

export default BarChart;
