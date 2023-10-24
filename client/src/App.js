import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Inventory from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import React from "react";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element = {<Layout />}>
            <Route path = "/" element = {<Navigate to="/dashboard" replace />} />
            <Route path = "/dashboard" element = {<Dashboard />} />
            <Route path = "/inventory" element={<Inventory />} />
            <Route path = "/customers" element={<Customers />} />
            <Route path = "/transactions" element={<Transactions />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </div>;
}

export default App;
