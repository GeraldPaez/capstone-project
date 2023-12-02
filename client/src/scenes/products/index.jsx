import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import Header from "components/Header";
import { useGetProductItemsQuery } from "state/api"; // Adjust the import path
// import { useGetProductsQuery } from "state/api";
import FlexBetween from "components/FlexBetween";
import StatBox from "components/StatBox";

const ProductItems = ({ _id, name, units, quantity, price }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: "#D4AC0D",
        borderRadius: "0.30rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 15, fontWeight: "bold" }}
          color={theme.palette.grey[100]}
          gutterBottom
        >
          {units}
        </Typography>
        <Typography
          color={theme.palette.grey[100]}
          variant="h5"
          component="div"
        >
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.grey[100]}>
          ₱{Number(price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          color={"#D4AC0D"}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.grey[100],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Unit: {units}</Typography>
          <Typography>Quantity: {quantity}</Typography>
          <Typography>Price: {price}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data: productsData, isLoading: productsLoading } =
    useGetProductItemsQuery();

  const isNonMobile = useMediaQuery("(min-width: 100px)");
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false);
  const [isQuantityBelowThreshold, setIsQuantityBelowThreshold] =
    useState(false);

  useEffect(() => {
    if (productsLoading) return; // Don't calculate if products are still loading

    // Calculate total quantity
    const totalQuantity = productsData.reduce(
      (acc, product) => acc + product.quantity,
      0
    );

    // Update the state when total quantity changes
    setIsQuantityBelowThreshold(totalQuantity < 260);

    // Show the dialog when quantity is below 260
    if (totalQuantity < 260) {
      setOpenDialog(true);
    }
  }, [productsLoading, productsData]);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  if (productsLoading) {
    return <>Loading...</>;
  }

  // Calculate total quantity for rendering
  const totalQuantityForRender = productsData.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return (
    <Box m="1rem 2rem">
      <FlexBetween>
        <Box sx={{ mb: "4rem" }}>
          <Header
            title={
              <Typography
                variant="h1"
                sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
              >
                Products
              </Typography>
            }
            subtitle={
              <Typography variant="subtitle1" sx={{ fontSize: "17px" }}>
                List of Available Products
              </Typography>
            }
          />
        </Box>
        <Box>
          <Link to="/inventory/items">
            <Button
              sx={{
                backgroundColor: theme.palette.secondary[500],
                color: theme.palette.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "18px 25px",
              }}
            >
              <EditNoteOutlinedIcon sx={{ mr: "7px" }} />
              Edit Products
            </Button>
          </Link>
          <StatBox
            title="Available Items"
            value={totalQuantityForRender.toLocaleString()} // Use the calculated total quantity here
            description=""
            icon={
              <Inventory2OutlinedIcon
                sx={{
                  color: theme.palette.secondary[300],
                  mr: "1px",
                  display: "block",
                  padding: "1rem",
                }}
              />
            }
          />

          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle sx={{ color: "red" }}>Warning</DialogTitle>
            <DialogContent>
              <Typography>
                Total Quantity is below 260. Please review your inventory.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </FlexBetween>
      {/* Display a warning message if total quantity is below 260 */}
      {isQuantityBelowThreshold && (
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 1, fontWeight: "bold" }}
        >
          Warning: Total Quantity is below 260.
        </Button>
      )}

      {productsData && productsData.length > 0 ? (
        <Box
          mt="30px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.40%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {productsData.map(({ _id, name, units, quantity, price }) => (
            <ProductItems
              key={_id}
              _id={_id}
              name={name}
              units={units}
              quantity={quantity}
              price={price}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
