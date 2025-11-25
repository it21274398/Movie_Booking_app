import React, { useContext } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import AddIcon from "@mui/icons-material/Add";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import EventSeatIcon from "@mui/icons-material/EventSeat";

const drawerWidth = 240;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AdminAuthContext);

  const menu = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin",
    },
    {
      label: "Bookings",
      icon: <EventSeatIcon />,
      path: "/admin/bookings",
    },

    {
      label: "Movies",
      icon: <MovieIcon />,
      path: "/admin/movies",
    },
    {
      label: "Add Movie",
      icon: <AddIcon />,
      path: "/admin/movies/add",
    },
    // {
    //   label: "Showtimes",
    //   icon: <ScheduleIcon />,
    //   path: "/admin/showtimes",
    //   disabled: true,
    // },
    {
      label: "Logout",
      icon: <LogoutIcon />,
      action: () => logout(),
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menu.map((item, index) => (
            <ListItem
              button
              key={index}
              disabled={item.disabled}
              onClick={() =>
                item.path ? navigate(item.path) : item.action && item.action()
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
