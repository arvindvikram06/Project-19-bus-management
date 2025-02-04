import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  AppBar,
  Button,
} from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Logout from "@mui/icons-material/Logout";
import FacultyProfile from "./FacultyProfile";
import FacultyAttendance from "./FacultyAttendance";

const menuItems = [
  { text: "Profile", icon: <AccountCircleIcon />, path: "/faculty/profile" },
  { text: "Attendance", icon: <AssignmentIcon />, path: "/faculty/attendance" },
];

const FacultyDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box sx={{ display: "flex" }}>
    
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Faculty Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
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
            <ListItem button component={Link} to={item.path} key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
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
          <Route path="profile" element={<FacultyProfile />} />
          <Route path="attendance" element={<FacultyAttendance />} />
          <Route
            path="*"
            element={
              <Typography variant="h3">Welcome to Faculty Dashboard</Typography>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default FacultyDashboard;
