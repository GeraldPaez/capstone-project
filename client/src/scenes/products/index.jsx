import React, { useState } from 'react'
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
import Header from "components/Header"
import { useGerProductsQuery } from 'state/api';

const Inventory = ({
  _id,
  name,
  units,
  quantity,
  price,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.primary[600],
        borderRadius: "0.55rem"
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 15 }} color={theme.palette.primary[900]} gutterBottom>
          {units}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.primary[100]}>
          ₱{Number(price).toFixed(2)}
        </Typography>

      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.secondary[200],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Unit {units}</Typography>
          <Typography>Quantity: {quantity}</Typography>
          <Typography>Price: {price}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

const Products = () => {
    const { data, isLoading } = useGerProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 100px)");
    console.log("data", data);
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="List of Available Products" />
        {data || !isLoading ? (
          <Box
            mt="30px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.40%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}
            }}
          >
            {data.map(
              ({
                _id,
                name,
                units,
                quantity,
                price,
              }) => (
                <Inventory
                  key={_id}
                  _id={_id}
                  name={name}
                  units={units}
                  quantity={quantity}
                  price={price}
                />
              )
            )}
          </Box>
        ) : (
          <>Loading...</>
        )}
    </Box>
  );
};

export default Products;