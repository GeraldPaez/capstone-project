import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
// import HomePage from "scenes/home";
import LoginPage from "scenes/login";
import Dashboard from "scenes/dashboard";
import Inventory from "scenes/products";
import Transactions from "scenes/transactions";
import Setting from "scenes/setting";
import Overview from "scenes/overview";
import Monthly from "scenes/monthly";
import Yearly from "scenes/yearly";
import Distribution from "scenes/distribution";
import Bar from "scenes/bar";
import Items from "scenes/items";
import SalesForecastingApp from "scenes/yearly";
// import Customers from "scenes/customers";
// import InventoryPage from "scenes/items";
// import Home from "scenes/home";
// import account from "scenes/account";
// import signUp from "scenes/signup";
import React from "react";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/home" element={<HomePage />} /> */}
            <Route
              path="/home"
              element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route element={<Layout />}>
              <Route path="/yearly" element={<SalesForecastingApp />} />
              {/* <Route path="/home" element={<HomePage />} /> */}
              {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/items" element={<Items />} />
              {/* <Route path="/customers" element={<Customers />} /> */}
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/yearly" element={<Yearly />} />
              <Route path="/distribution" element={<Distribution />} />
              <Route path="/bar" element={<Bar />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
