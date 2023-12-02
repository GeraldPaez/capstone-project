import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import logoImage from "assets/logo.png";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box width="100%" p="1rem 40%" textAlign="center">
        {/* <Box
          // style={boxStyle}
          component="img"
          alt="logo"
          src={logoImage}
          height="100px"
          width="80px"
          sx={{ objectFit: "cover" }}
        /> */}
        <Typography
          // marginRight="3rem"
          // marginTop="25px"
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          SaleStocker
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.primary[800]}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SaleStocker, the Inventory and Sales Management for your
          Business!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
