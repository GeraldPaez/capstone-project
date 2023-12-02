import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { PointOfSale, PersonAdd } from "@mui/icons-material";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarViewMonthOutlinedIcon from "@mui/icons-material/CalendarViewMonthOutlined";
import {
  Box,
  // Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import OverviewChart from "components/OverviewChart";
import BarChart from "components/BarChart";
// import PieChart from "components/PieChart";
import { useGetDashboardQuery, useGetProductItemsQuery } from "state/api";
import StatBox from "components/StatBox";
import { useState } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  const { data: quantityData } = useGetProductItemsQuery();
  console.log("data", data);

  const columns = [
    {
      field: "ProdID",
      headerName: "Product ID",
      flex: 1,
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "Unit",
      headerName: "Unit",
      flex: 1,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "Total",
      headerName: "Cost",
      flex: 1,
    },
  ];

  // Check if quantityData is defined
  const totalQuantity = quantityData
    ? quantityData.reduce((acc, product) => acc + product.quantity, 0)
    : 0;

  return (
    <Box m="1.5rem 2.5rem">
      {/* <FlexBetween>
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.secondary[900],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
          >
            <DownloadOutlined sx={{ mr: "5px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween> */}

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Products"
          value={totalQuantity.toLocaleString()}
          description=""
          icon={
            <CalendarViewMonthOutlinedIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Customers"
          value={
            data && data.totalCustomers
              ? data.totalCustomers.toLocaleString()
              : ""
          }
          description=""
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={
            data && data.todayStats.totalSales
              ? data.todayStats.totalSales.toLocaleString()
              : ""
          }
          description=""
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Sales"
          value={
            data && data.yearlySalesTotal
              ? data.yearlySalesTotal.toLocaleString()
              : ""
          }
          description=""
          icon={
            <ReceiptOutlinedIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.primary[800]}
          p="1rem"
          borderRadius="0.55rem"
          boxShadow="0 0 4px rgba(0, 0, 0, 0.4)"
        >
          <Typography
            variant="h5"
            style={{ marginLeft: "0.1rem" }}
            sx={{ color: theme.palette.secondary[100] }}
          >
            Annual Sales
          </Typography>
          <OverviewChart view="Sales" isDashboard={false} />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={theme.palette.primary[800]}
          p="0.5rem"
          borderRadius="0.55rem"
          boxShadow="0 0 4px rgba(0, 0, 0, 0.4)"
        >
          <Typography
            variant="h5"
            style={{ marginLeft: "0.5rem" }}
            sx={{ color: theme.palette.secondary[100] }}
          >
            Sales By Units
          </Typography>
          <BarChart isDashboard={true} />
          <Typography
            p="0 0.2rem"
            fontSize="0.2rem"
            sx={{ color: theme.palette.secondary[200] }}
          ></Typography>
        </Box>
        <Box
          gridColumn="span 7"
          gridRow="span 3"
          boxShadow="0 0 4px rgba(0, 0, 0, 0.4)"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#D4AC0D",
              color: theme.palette.grey[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary[800],
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#D4AC0D",
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[900]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
