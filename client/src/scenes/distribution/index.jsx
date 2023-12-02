import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/PieChart";

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Distribution" subtitle="Breakdown of Sales By Units" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
