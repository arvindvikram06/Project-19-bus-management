import React, { useEffect, useState } from "react";
import axios from "axios";
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

function FacultyProfile() {
  const [profileData, setProfileData] = useState({
    department: "",
    faculty_code: "",
    gender: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setStatus("loading");
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:7000/faculty/getFaculty",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfileData(response.data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchProfile();
  }, []);

  const handleOpen = () => {
    setOpen(true);
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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:7000/faculty/complete-profile",
        profileData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  let content;

  if (status === "loading") {
    content = (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  } else if (status === "succeeded") {
    content = (
      <Grid container justifyContent="center" mt={5}>
        <Grid item xs={12} sm={8} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                Faculty Profile
              </Typography>
              <Typography variant="h6" component="div">
                {"Department: " + (profileData.department || "undefined")}
              </Typography>
              <Typography color="text.secondary">
                {"Faculty Code: " + (profileData.faculty_code || "undefined")}
              </Typography>
              <Typography color="text.secondary">
                {"Gender: " + (profileData.gender || "undefined")}
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
  } else if (status === "failed") {
    content = (
      <Box mt={5}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {content}
      {/* Dialog for updating profile */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Department"
            name="department"
            value={profileData.department}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            label="Faculty Code"
            name="faculty_code"
            value={profileData.faculty_code}
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
}

export default FacultyProfile;
