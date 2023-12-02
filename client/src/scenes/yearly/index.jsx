// SalesForecastingApp.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
// import { useGetPredictedSalesQuery } from "state/api";
import Header from "components/Header";

const SalesForecastingApp = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const { data: salesData, isLoading: isSalesLoading } = useGetSalesQuery();
  // const workerRef = useRef(new Worker("./arimaWorker.js"));

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

  const trainARIMA = async () => {
    try {
      const ARIMA = await import("arima/async");

      // Check if data is available
      if (!data || !data.dailyData) return;

      // Remove outliers
      const totalSales = removeOutliers(
        data.dailyData.map((entry) => entry.totalSales)
      );

      // Split data into training and testing sets
      const splitIndex = Math.ceil(totalSales.length * 0.7);
      const trainData = totalSales.slice(0, splitIndex);
      const testData = totalSales.slice(splitIndex);

      // Perform grid search for p, d, and q
      let bestRMSE = Number.MAX_SAFE_INTEGER;
      let bestParameters = { p: 0, d: 0, q: 0 };

      for (let p = 0; p <= 3; p++) {
        for (let d = 0; d <= 1; d++) {
          for (let q = 0; q <= 3; q++) {
            const arimaModel = new ARIMA({ p, d, q });
            await arimaModel.train(trainData);

            // Make predictions for the next 4 steps on the testing set
            const numberOfSteps = 4;
            const [predictedValues] = await arimaModel.predict(numberOfSteps);

            // Calculate RMSE
            const rmse = calculateRMSE(
              predictedValues,
              testData.slice(0, numberOfSteps)
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
      await finalARIMAModel.train(trainData);

      // Make predictions for the next 4 steps on the testing set
      const numberOfSteps = 4;
      const [predictedValues] = await finalARIMAModel.predict(numberOfSteps);

      setPredictions(predictedValues);

      console.log("Best Parameters:", bestParameters);
      console.log("Best RMSE:", bestRMSE);
    } catch (error) {
      console.error("Error while training ARIMA model:", error);
    }
  };

  const removeOutliers = (data) => {
    // Remove outliers using Z-score
    const mean = data.reduce((acc, value) => acc + value, 0) / data.length;
    const stdDev = Math.sqrt(
      data.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) /
        data.length
    );
    const zScores = data.map((value) => Math.abs((value - mean) / stdDev));

    // Define a threshold (e.g., 2.5) to identify outliers
    const threshold = 2.5;
    const filteredData = data.filter(
      (value, index) => zScores[index] <= threshold
    );

    return filteredData;
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
    trainARIMA();
  }, [data]);

  const chartData = useMemo(() => {
    if (!data || !data.dailyData) return [];

    const { dailyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: "#2ECC71",
      data: [],
    };
    const predictedSalesLine = {
      id: "predictedSales",
      color: "#FF5733",
      data: [],
    };

    // Aggregate daily data by year
    const yearlyData = new Map();
    dailyData.forEach(({ date, totalSales }) => {
      const year = new Date(date).getFullYear();
      if (!isNaN(totalSales) && !isNaN(year)) {
        if (!yearlyData.has(year)) {
          yearlyData.set(year, { Sales: 0 });
        }
        yearlyData.get(year).Sales += totalSales;
      }
    });

    // Filter out data points with NaN values from the x-axis
    Array.from(yearlyData.entries())
      .filter(([year]) => !isNaN(year))
      .forEach(([year, { Sales }]) => {
        totalSalesLine.data.push({
          x: year.toString(),
          y: Sales,
        });
      });

    predictions.forEach((value, index) => {
      const lastTotalSalesPoint =
        totalSalesLine.data[totalSalesLine.data.length - 1];

      // Connect the last point of totalSalesLine to the first point of predictedSalesLine
      if (index === 0) {
        predictedSalesLine.data.push({
          x: lastTotalSalesPoint.x,
          y: lastTotalSalesPoint.y,
        });
      }

      // Use the last year of totalSalesLine.data as the starting point for predictedSalesLine
      const year = parseInt(lastTotalSalesPoint.x) + index + 1;

      predictedSalesLine.data.push({
        x: year.toString(),
        y: isNaN(value) ? 0 : value * 160,
      });
    });

    return [totalSalesLine, predictedSalesLine].map((line) => ({
      ...line,
      curve: "monotoneX",
    }));
  }, [data, predictions]);

  if (!data || isSalesLoading) return "Loading...";

  return (
    <div style={{ height: "400px" }}>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Sales Progress"
          subtitle="Chart of Actual and Predicted Yearly Sales"
        />
        <Box height="75vh">
          <ResponsiveLine
            // width={1300}
            // height={700}
            margin={{ top: 30, right: 30, bottom: 60, left: 60 }}
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
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            // curve="catmullRom"
            // curve="monotoneX"
            axisBottom={{
              tickValues: "every 1 year",
              legend: "Date",
              legendOffset: 50,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 2,
              tickPadding: 1,
              tickRotation: 0,
              legend: isDashboard
                ? ""
                : `Total ${view === "Sales" ? "Units" : "Sales"}`,
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
        </Box>
      </Box>
    </div>
  );
};

export default SalesForecastingApp;
