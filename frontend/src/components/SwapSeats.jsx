import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/studentSlice";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const SwapSeats = () => {
  const dispatch = useDispatch();
  const { students, status } = useSelector((state) => state.student);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [firstStudent, setFirstStudent] = useState(null);
  const [secondStudent, setSecondStudent] = useState(null);
  const [newBus, setNewBus] = useState("");

  // Fetch students on component load
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Handle opening and closing the dialog
  const handleClickOpen = () => {
    if (!firstStudent || !secondStudent) {
      alert("Please select two students before swapping.");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFirstStudent(null);
    setSecondStudent(null);
    setNewBus("");
  };

  const handleSwap = async () => {
    if (!firstStudent || !secondStudent) {
      alert("Please select two students to swap.");
      return;
    }

    const token = localStorage.getItem("token");
    // console.log(firstStudent,secondStudent)

    try {
      // Send both student IDs in the request body
      await axios.post(
        `http://localhost:7000/admin/swapSeats`,
        {
          student1Id: firstStudent.rollNo,
          student2Id: secondStudent.rollNo,
          
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Seats swapped successfully!");
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Failed to swap seats.");
    }
  };

  // Filter students by roll number
  const filteredStudents = students.filter((student) =>
    student.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  // Select a student for the swap
  const handleSelectStudent = (student) => {
    if (!firstStudent) {
      setFirstStudent(student);
    } else if (!secondStudent) {
      setSecondStudent(student);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Swap Seats</h1>
      <TextField
        label="Search by Roll No"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "20px" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roll No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Current Bus</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.busNumber}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSelectStudent(student)}
                  >
                    {firstStudent === student
                      ? "First Selected"
                      : secondStudent === student
                      ? "Second Selected"
                      : "Select"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display selected students */}
      {firstStudent && secondStudent && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Students for Swap:</h3>
          <p>First Student: {firstStudent.name}</p>
          <p>Second Student: {secondStudent.name}</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
            style={{ marginTop: "10px" }}
          >
            Swap Seats
          </Button>
        </div>
      )}

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Swap Seats</DialogTitle>
        <DialogContent>
          <h3>
            First Student: {firstStudent ? firstStudent.name : "Not Selected"}
          </h3>
          <h3>
            Second Student:{" "}
            {secondStudent ? secondStudent.name : "Not Selected"}
          </h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSwap} color="primary">
            Swap
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SwapSeats;
