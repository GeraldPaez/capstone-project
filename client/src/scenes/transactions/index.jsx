// Transaction Component
import React, { useState } from "react";
import {
  Box,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("data", data);

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    ProdID: "",
    Date: "",
    Name: "",
    Unit: "",
    Quantity: 0,
    Price: 0,
  });

  const [deleteTransactionId, setDeleteTransactionId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const addTransactionMutation = useAddTransactionMutation();
  const deleteTransactionMutation = useDeleteTransactionMutation();

  const handleAddTransaction = async () => {
    try {
      await addTransactionMutation.mutateAsync(newTransaction);
      setAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDeleteTransaction = async () => {
    try {
      await deleteTransactionMutation.mutate(deleteTransactionId);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
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
      field: "Price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "Total",
      headerName: "Cost",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => setDeleteDialogOpen(true)}>Delete</Button>
      ),
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Transactions" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#D4AC0D",
            color: theme.palette.primary[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary[800],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#D4AC0D",
            color: theme.palette.grey[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[25, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
      <Dialog open={isAddDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          {/* Form for adding a new transaction */}
          <TextField
            label="Product ID"
            value={newTransaction.ProdID}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, ProdID: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            value={newTransaction.Date}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, Date: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          {/* ... (Add other form fields based on your requirements) */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddTransaction}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Transaction</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this transaction?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteTransaction}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transactions;
