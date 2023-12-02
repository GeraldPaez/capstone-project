import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import HoriLine from "assets/HoriLine.png";
import BlueLine from "assets/blueline.png";
import reline from "assets/reline.png";
// import { useGetProductItemsQuery } from "state/api";

const REACT_APP_URL = "http://localhost:3030/inventory/items";

export default function InventoryPage() {
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [isLoaded, setIsLoaded] = useState(true);
  const [products, setProducts] = useState([]);
  const theme = useTheme();
  const [search, setSearch] = useState("");

  // New state variables for dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState(false);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoaded(false);
      const response = await axios.get(REACT_APP_URL);
      setProducts(response.data || []);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred");
      setIsLoaded(true);
    }
  };

  const fetchProductForEdit = async (id) => {
    try {
      setIsLoaded(false);
      const response = await axios.get(`${REACT_APP_URL}/${id}`);
      const { message, products } = response.data;

      if (message === "Product successfully found" && products) {
        const product = products;

        setID(product._id);
        setName(product.name);
        setUnits(product.units);
        setQuantity(product.quantity);
        setPrice(product.price);
      }
      setIsLoaded(true);
    } catch (error) {
      displayDialog("Error", "An error occurred");
      setIsLoaded(true);
    }
  };

  const displayDialog = (title, content) => {
    setDialogTitle(title);
    setDialogContent(content);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const doSave = async () => {
    if (!id || id === "") createNewProduct();
    else updateProduct();
  };

  const createNewProduct = async () => {
    try {
      setIsLoaded(false);

      const payload = {
        name: name,
        units: units,
        quantity: quantity,
        price: price,
      };

      const result = await axios.post(REACT_APP_URL, payload);
      await fetchProducts();
      clearInput();
      setIsLoaded(true);

      displayDialog("Message", "Product successfully added");
    } catch (error) {
      setIsLoaded(true);
      displayDialog("Error", "An error occurred");
    }
  };

  const updateProduct = async () => {
    try {
      setIsLoaded(false);

      const payload = {
        name: name,
        units: units,
        quantity: quantity,
        price: price,
      };

      const result = await axios.put(`${REACT_APP_URL}/${id}`, payload);
      await fetchProducts();
      clearInput();
      setIsLoaded(true);

      displayDialog("Message", "Product successfully updated");
    } catch (error) {
      setIsLoaded(true);
      displayDialog("Error", "An error occurred");
    }
  };

  const deleteProduct = async (id) => {
    try {
      setID(id);
      setOpenDeleteConfirmationDialog(true);
    } catch (error) {
      setIsLoaded(true);
      alert("An error occurred");
      displayDialog("Error", "An error occurred");
    }
  };

  const deleteProductConfirmed = async (id) => {
    try {
      setIsLoaded(false);
      const result = await axios.delete(`${REACT_APP_URL}/${id}`);
      await fetchProducts();
      setIsLoaded(true);

      displayDialog("Message", "Product successfully deleted");
    } catch (error) {
      setIsLoaded(true);
      alert("An error occurred");
      displayDialog("Error", "An error occurred");
    } finally {
      setOpenDeleteConfirmationDialog(false);
    }
  };

  const clearInput = () => {
    setID("");
    setName("");
    setUnits("");
    setQuantity("");
    setPrice("");
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "units", headerName: "Units", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <button
            className="btn1"
            onClick={() => fetchProductForEdit(params.row._id)}
          >
            Edit
          </button>
          <br />
          <button
            className="btn2"
            onClick={() => deleteProduct(params.row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Box
        m={2}
        marginLeft={4}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Link to="/inventory">
          <Button
            sx={{
              backgroundColor: theme.palette.secondary[500],
              color: theme.palette.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "14px 16px",
            }}
          >
            <ArrowBackOutlinedIcon sx={{ mr: "7px" }} />
            Go Back
          </Button>
        </Link>
      </Box>
      <Box>
        <h1 className="inv">Inventory Management</h1>
        {!isLoaded ? (
          <h2>Loading...</h2>
        ) : (
          <div className="">
            <div className="">
              <h2>Edit Product</h2>
            </div>
            <div className="">
              <p className="items">
                <label className="pcategory">
                  <b>Product Units</b>
                </label>
                <select
                  className="pcatbutton"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                >
                  <option value="">--Select Unit--</option>
                  <option value="Box">Box</option>
                  <option value="Kilogram">Kilogram</option>
                  <option value="Bundle">Bundle</option>
                  <option value="Piece">Piece</option>
                </select>
              </p>
              <p className="items2">
                <label className="">
                  <b>Product Name</b>
                </label>
                <input
                  className=""
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p className="items3">
                <label className="">
                  <b>Product Price</b>
                </label>
                <input
                  className=""
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </p>
              <p className="items4">
                <label className="">
                  <b>Product Quantity</b>
                </label>
                <input
                  className=""
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </p>
              <p className="items5">
                <button className="button2" onClick={doSave}>
                  Save
                </button>
              </p>
            </div>
            <div className="">
              {/* <Box
                m="1.2rem 4rem"
                component="img"
                alt="HoriLine"
                src={HoriLine}
                height="50px"
                width="1250px"
                borderRadius="100%"
                sx={{ objectFit: "cover" }}
              ></Box> */}
              <Box m="1.5rem 2.5rem">
                <h2 className="lst">Product List</h2>
                <DataGrid
                  rows={products}
                  columns={columns}
                  autoHeight
                  disableSelectionOnClick
                  components={{ Toolbar: DataGridCustomToolbar }}
                  componentsProps={{
                    toolbar: { searchInput, setSearchInput, setSearch },
                  }}
                  getRowId={(row) => row._id}
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                      margin: "16px",
                    },
                    "& .MuiDataGrid-columnHeader": {
                      borderBottom: "1px solid #ddd",
                      backgroundColor: "#D4AC0D",
                      color: theme.palette.primary[800],
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer": {
                      backgroundColor: "none",
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: "#D4AC0D",
                      color: theme.palette.primary[800],
                      borderTop: "none",
                    },
                    "& .MuiDataGrid-row": {
                      "&:hover": {
                        backgroundColor: theme.palette.primary[800],
                      },
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                      color: `${theme.palette.secondary[200]} !important`,
                    },
                    "& .MuiDataGrid-row.Mui-selected": {
                      backgroundColor: theme.palette.secondary[500],
                      color: theme.palette.grey[200],
                      "&:hover": {
                        backgroundColor: theme.palette.primary[800],
                      },
                    },
                    "& .btn1, .btn2": {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "8px 16px",
                      margin: "2px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      border: "none",
                      color: theme.palette.grey[100],
                    },
                    "& .btn1": {
                      margin: "2px",
                      backgroundColor: theme.palette.secondary[500], // Edit button background color
                    },
                    "& .btn2": {
                      backgroundColor: theme.palette.error.main, // Delete button background color
                    },
                  }}
                />
              </Box>
            </div>
          </div>
        )}
      </Box>
      {/* Add Dialog component for displaying messages */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          marginLeft: "12rem",
          padding: "10rem",
        }}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>OK</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteConfirmationDialog}
        onClose={() => setOpenDeleteConfirmationDialog(false)}
        sx={{
          marginLeft: "12rem",
          padding: "10rem",
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirmationDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenDeleteConfirmationDialog(false);
              deleteProductConfirmed(id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
