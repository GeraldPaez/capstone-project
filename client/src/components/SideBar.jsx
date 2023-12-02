import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  // Groups2Outlined,
  ReceiptLongOutlined,
  CalendarMonthOutlined,
  // AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import ViewTimelineOutlinedIcon from "@mui/icons-material/ViewTimelineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import logoImage from "assets/logo.png";

const navItems = [
  {
    text: "Business Facing",
    icon: null,
  },
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Inventory",
    icon: <Inventory2OutlinedIcon />,
  },
  // {
  //     text: "Customers",
  //     icon: <Groups2Outlined />,
  // },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <ViewTimelineOutlinedIcon />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Yearly",
    icon: <EventOutlinedIcon />,
  },
  // {
  //   text: "Management",
  //   icon: null,
  // },
  // {
  //   text: "Admin",
  //   icon: <AdminPanelSettingsOutlined />,
  // },
];

const SideBar = ({
  user,
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  // const boxStyle = { opacity: 0.5 };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[900],
              backgroundColor: theme.palette.secondary[400],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "3px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 1rem 1rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.2rem">
                  <Box
                    // style={boxStyle}
                    component="img"
                    alt="logo"
                    src={logoImage}
                    height="80px"
                    width="80px"
                    sx={{ objectFit: "cover" }}
                  />
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{ color: "#FDFEFE" }}
                  >
                    SaleStocker
                  </Typography>
                  {/* <Box
                    component="img"
                    alt="logo"
                    src={logoImage}
                    height="80px"
                    width="80px"
                    sx={{ objectFit: "cover" }}
                  /> */}
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "1.2rem 0 1rem 3rem", color: "#FDFEFE" }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.grey[100]
                            : theme.palette.grey[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.grey[100]
                              : theme.palette.grey[100],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="1rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                // src={`http://localhost:3030/register/${user.picturePath}`}
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
                onError={(e) => console.error("Error loading image:", e)}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: "#FDFEFE" }}
                >
                  {user.firstName}
                </Typography>
                <Typography fontSize="0.8rem" sx={{ color: "#FDFEFE" }}>
                  {user.role}
                </Typography>
              </Box>
              {/* <SettingsOutlined
                sx={{
                  color: "#FDFEFE",
                  fontSize: "25px",
                }}
              /> */}
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
