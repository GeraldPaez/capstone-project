import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Sales",
    "Dashboard",
    "ProductItems",
    "Forecast",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `dashboard/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "inventory/products",
      providesTags: ["Products"],
    }),
    getProductItems: build.query({
      query: (id) => "inventory/items",
      providesTags: ["ProductItems"],
    }),
    getItems: build.query({
      query: (id) => `inventory/items${id}`,
      providesTags: ["ProductItems"],
    }),
    postItems: build.mutation({
      query: (newProduct) => ({
        url: "inventory/items",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["ProductItems"],
    }),
    putItems: build.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `inventory/items/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["ProductItems"],
    }),
    deleteItems: build.mutation({
      query: (id) => ({
        url: `inventory/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductItems"],
    }),
    // getCustomers: build.query({
    //   query: () => "client/customers",
    //   providesTags: ["Customers"],
    // }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getSales: build.query({
      query: () => "sales/revenue",
      providesTags: ["Sales"],
    }),
    getDashboard: build.query({
      query: () => "dashboard/dashboard",
      providesTags: ["Dashboard"],
    }),
    getPredictedSales: build.query({
      query: () => "sales/prediction",
      providesTags: ["Forecast"],
    }),
    getTotalQuantity: build.query({
      query: () => "inventory/items",
      providesTags: ["Products"],
    }),
    addTransaction: build.mutation({
      query: (newTransaction) => ({
        url: "client/transactions",
        method: "POST",
        body: newTransaction,
      }),
      invalidatesTags: ["Transactions"],
    }),
    deleteTransaction: build.mutation({
      query: (id) => ({
        url: `client/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  // useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetSalesQuery,
  useGetProductItemsQuery,
  usePostItemsMutation,
  usePutItemsMutation,
  useDeleteItemsMutation,
  useGetDashboardQuery,
  useGetPredictedSalesQuery,
  useGetTotalQuantityQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = api;
