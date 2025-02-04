import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Dashboard, DirectionsBus, History, Logout, Person } from "@mui/icons-material";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/studentSlice";
import ViewBuses from "./ViewBuses";
import MyBookings from "./MyBookings";
import BookingHistory from "./BookingHistory";
import StudentProfile from "./StudentProfile";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentData = useSelector((state) => state.student.data);

  useEffect(() => {
    dispatch(fetchStudents()); 
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, route: "/student/dashboard" },
    {
      text: "View Buses",
      icon: <DirectionsBus />,
      route: "/student/view-buses",
    },
    // {
    //   text: "My Bookings",
    //   icon: <DirectionsBus />,
    //   route: "/student/my-bookings",
    // },
    {
      text: "Profile",
      icon: <Person />,
      route: "/student/profile",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Dashboard
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
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.route)}
            >
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
          <Route path="view-buses" element={<ViewBuses />} />
          {/* <Route path="my-bookings" element={<MyBookings />} /> */}
          <Route path="profile" element={<StudentProfile />} />
          <Route
            path="*"
            element={
              <Typography variant="h3">Welcome to Student Dashboard</Typography>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
