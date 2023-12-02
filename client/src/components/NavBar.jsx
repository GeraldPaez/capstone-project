import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  // Search,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  Button,
  Typography,
  Box,
  Toolbar,
  IconButton,
  // InputBase,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = ({ user, isSideBarOpen, setIsSideBarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
          {/* <FlexBetween
            backgroundColor={theme.palette.secondary[900]}
            borderRadius="12px"
            gap="7rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween> */}
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "light" ? (
              <LightModeOutlined sx={{ fontSize: "28px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "28px" }} />
            )}
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.90rem"
                  sx={{ color: theme.palette.secondary[300] }}
                >
                  {user.firstName}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[400] }}
                >
                  {user.role}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/setting");
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.primary[700],
                  },
                  padding: "10px 20px",
                }}
              >
                <SettingsOutlinedIcon
                  sx={{
                    fontSize: 20,
                    marginRight: 1,
                    color: theme.palette.primary[300],
                  }}
                />
                <Typography variant="body1" color="primary" fontWeight="bold">
                  Settings
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/login");
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.primary[700],
                  },
                  padding: "10px 20px",
                }}
              >
                <ExitToAppOutlinedIcon
                  sx={{
                    fontSize: 20,
                    marginRight: 1,
                    color: theme.palette.primary[300],
                  }}
                />
                <Typography variant="body1" color="primary" fontWeight="bold">
                  Log Out
                </Typography>
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
