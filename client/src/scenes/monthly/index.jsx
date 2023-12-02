import React, { useMemo, useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";

const Monthly = () => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const { data: salesData, isLoading: isSalesLoading } = useGetSalesQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your sales data fetching logic (useGetSalesQuery) here...
        setData(salesData);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, [salesData]);

  const getNextMonth = (currentMonth, steps) => {
    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentIndex = monthOrder.indexOf(currentMonth);
    const nextIndex = (currentIndex + steps) % 12;

    return monthOrder[nextIndex];
  };

  const trainARIMA = async (monthlyData) => {
    try {
      const ARIMA = await import("arima/async");

      // Check if data is available
      if (!monthlyData) return;

      // Extract total sales data
      const totalSales = monthlyData.map((entry) => entry.totalSales);

      // Perform grid search for p, d, and q
      let bestRMSE = Number.MAX_SAFE_INTEGER;
      let bestParameters = { p: 0, d: 0, q: 0 };

      for (let p = 0; p <= 3; p++) {
        for (let d = 0; d <= 1; d++) {
          for (let q = 0; q <= 3; q++) {
            const arimaModel = new ARIMA({ p, d, q });
            await arimaModel.train(totalSales);

            // Make predictions for the next 4 steps
            const numberOfSteps = 10;
            const [predictedValues] = await arimaModel.predict(numberOfSteps);

            // Calculate RMSE
            const rmse = calculateRMSE(
              predictedValues,
              totalSales.slice(-numberOfSteps)
            );

            // Update best parameters if current RMSE is lower
            if (rmse < bestRMSE) {
              bestRMSE = rmse;
              bestParameters = { p, d, q };
            }
          }
        }
      }

      // Use the best parameters to train the final model
      const finalARIMAModel = new ARIMA(bestParameters);
      await finalARIMAModel.train(totalSales);

      // Make predictions for the next 4 steps
      const numberOfSteps = 12;
      const [predictedValues] = await finalARIMAModel.predict(numberOfSteps);

      setPredictions(predictedValues);

      console.log("Best Parameters:", bestParameters);
      console.log("Best RMSE:", bestRMSE);
    } catch (error) {
      console.error("Error while training ARIMA model:", error);
    }
  };

  const calculateRMSE = (predictedValues, actualValues) => {
    // Check if the lengths of predictedValues and actualValues are the same
    if (predictedValues.length !== actualValues.length) {
      console.error("Length mismatch between predictedValues and actualValues");
      return null;
    }

    // Calculate the squared differences
    const squareDifferences = predictedValues.map((pred, i) =>
      Math.pow(pred - actualValues[i], 2)
    );

    // Calculate the mean squared difference
    const meanSquareDifference =
      squareDifferences.reduce((acc, val) => acc + val, 0) /
      squareDifferences.length;

    // Calculate the root mean squared error (RMSE)
    const rmse = Math.sqrt(meanSquareDifference);

    return rmse;
  };

  useEffect(() => {
    if (data && data.monthlyData) {
      trainARIMA(data.monthlyData);
    }
  }, [data]);

  const chartData = useMemo(() => {
    if (!data || !data.monthlyData) return [];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: "#2ECC71",
      data: monthlyData.map(({ month, totalSales }) => ({
        x: month,
        y: totalSales,
      })),
    };
    const predictedSalesLine = {
      id: "predictedSales",
      color: "#FF5733",
      data: predictions.map((value, index) => {
        const lastMonth = monthlyData[monthlyData.length - 1].month;
        const nextMonth = getNextMonth(lastMonth, index + 1);
        return {
          x: nextMonth,
          y: isNaN(value) ? 0 : value,
        };
      }),
    };

    return [totalSalesLine, predictedSalesLine].map((line) => ({
      ...line,
      curve: "monotoneX",
    }));
  }, [data, predictions]);

  if (!data || isSalesLoading) return "Loading...";

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Monthly Sales"
        subtitle="Chart of Actual and Predicted Monthly Sales"
      />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={chartData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-0.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 2,
              tickPadding: 1,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -55,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={5}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 10,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;
