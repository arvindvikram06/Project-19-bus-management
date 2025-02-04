import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Dashboard, DirectionsBus, Group, Logout, SwapHorizSharp } from "@mui/icons-material";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuses } from "../redux/busSlice";
import ManageBuses from "./ManageBuses";
import FacultyAllocationPage from "./FacultyAllocationPage";
import SwapSeats from "./SwapSeats";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buses = useSelector((state) => state.bus.buses);

  useEffect(() => {
    dispatch(fetchBuses()); 
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, route: "/admin/dashboard" },
    { text: "Manage Buses", icon: <DirectionsBus />, route: "/admin/manage-buses" },
    { text: "Allocate Faculty", icon: <Group />, route: "/admin/allocate-faculty" },
    {text:"Swap Seats", icon:<SwapHorizSharp/>, route:"/admin/swap-seats"},
  ];

  return (
    <Box sx={{ display: "flex" }}>
     
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bus Management System
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

   
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.route)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}/>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3, marginTop: "64px" }}
      >
        <Toolbar />
        <Routes>
          <Route path="manage-buses" element={<ManageBuses />} />
          <Route path="allocate-faculty" element={<FacultyAllocationPage/>} />
            <Route path="swap-seats" element={<SwapSeats />} />
            <Route path="*" element={<Typography variant="h3">Welcome to Admin Dashboard</Typography>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
