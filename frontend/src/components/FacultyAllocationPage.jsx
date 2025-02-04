import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchFaculty } from "../redux/facultySlice";
import { fetchBuses, allocateFaculty } from "../redux/busSlice";

const FacultyAllocationPage = () => {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedBus, setSelectedBus] = useState("");

  const { faculty } = useSelector((state) => state.faculty);
  const { buses } = useSelector((state) => state.bus);

  useEffect(() => {
    dispatch(fetchFaculty());
    dispatch(fetchBuses());
  }, [dispatch]);

  const handleAllocateClick = (faculty) => {
    setSelectedFaculty(faculty);
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (selectedFaculty && selectedBus) {
      dispatch(
        allocateFaculty({
          busId: selectedBus,
          facultyId: selectedFaculty.id,
        })
      );
      setIsDialogOpen(false);
      setSelectedFaculty(null);
      setSelectedBus("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Allocate Faculty to Bus
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Faculty ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Department</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faculty.map((fac) => (
              <TableRow key={fac.id}>
                <TableCell>{fac.id}</TableCell>
                <TableCell>{fac.name}</TableCell>
                <TableCell>{fac.department}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAllocateClick(fac)}
                  >
                    Allocate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Faculty Allocation */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Allocate Faculty</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Faculty: {selectedFaculty?.name} ({selectedFaculty?.facultyId})
          </Typography>
          <Select
            value={selectedBus}
            onChange={(e) => setSelectedBus(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">
              <em>Select a Bus</em>
            </MenuItem>
            {buses.map((bus) => (
              <MenuItem key={bus.busId} value={bus.busId}>
                {bus.busNumber}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!selectedBus}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FacultyAllocationPage;
