import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentProfile,
  updateStudentProfile,
} from "../redux/studentProfileSlice";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";

const departments = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
];
const genders = ["Male", "Female", "Other"];

const StudentProfile = ({ studentId }) => {
  const dispatch = useDispatch();
  const studentProfile = useSelector(
    (state) => state.studentProfile.studentProfile
  );
  const status = useSelector((state) => state.studentProfile.status);
  const error = useSelector((state) => state.studentProfile.error);

  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    rollNo: "",
    department: "",
    semester: "",
    gender: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudentProfile());
    }
  }, [status, dispatch]);

  const handleOpen = () => {
    if (studentProfile) {
      setProfileData({
        name: studentProfile.name || "",
        rollNo: studentProfile.rollNo || "",
        department: studentProfile.department || "",
        semester: studentProfile.semester || "",
        gender: studentProfile.gender || "",
      });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Profile Data to Send:", profileData);
    dispatch(updateStudentProfile(profileData));
    handleClose();
  };

  let content;

  if (status === "loading") {
    content = (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }
    content = (
      <Grid container justifyContent="center" mt={5}>
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                Student Profile
              </Typography>
              <Typography variant="h6" component="div">
                {"Name: " + (studentProfile.name || "undefined")}
              </Typography>
              <Typography color="text.secondary">
                {"Roll No: " + (studentProfile.rollNo || "undefined")}
              </Typography>
              <Typography color="text.secondary">
                {"Department: " + (studentProfile.dept || "undefined")}
              </Typography>
              <Typography color="text.secondary">
                {"Semester: " + (studentProfile.sem || "undefined")}
              </Typography>
              <Typography color="text.secondary">
                {"Gender: " + (studentProfile.gender || "undefined")}
              </Typography>
              <Typography color="text.secondary">
                {"SeatNo: " + (studentProfile.seatNo || "undefined")}
              </Typography>
              <Typography color="text.secondary">
                {"Bus Number : " + (studentProfile?.busResponseDTO?.busNumber || "undefined")}
              </Typography>
            </CardContent>
            <Box textAlign="center" p={2}>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Update Profile
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    );
   

  return (
    <Box p={3}>
      {content}
      {/* Dialog for updating profile */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            label="Roll No"
            name="rollNo"
            value={profileData.rollNo}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            select
            margin="normal"
            label="Department"
            name="department"
            value={profileData.department}
            onChange={handleChange}
            fullWidth
            required
          >
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            label="Semester"
            name="semester"
            type="number"
            value={profileData.semester}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            select
            margin="normal"
            label="Gender"
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            fullWidth
            required
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentProfile;
