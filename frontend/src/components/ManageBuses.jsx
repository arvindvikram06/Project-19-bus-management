import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchBuses, createBus, updateBus, deleteBus } from "../redux/busSlice";

const ManageBuses = () => {
  const dispatch = useDispatch();
  const { buses, status } = useSelector((state) => state.bus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBus, setCurrentBus] = useState(null);

  useEffect(() => {
    dispatch(fetchBuses());
  }, [dispatch]);


  const columns = [
    { field: "busId", headerName: "Bus ID", width: 100 },
    { field: "busNumber", headerName: "Bus Number", width: 150 },
    { field: "totalSeats", headerName: "Total Seats", width: 130 },
    { field: "availableSeats", headerName: "Available Seats", width: 150 },
    { field: "route", headerName: "Route", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
            style={{ marginTop: "10px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.busId)}
            style={{ marginTop: "10px" }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

 
  const handleEdit = (bus) => {
    setCurrentBus(bus);   
    setIsModalOpen(true); 
  };

  const handleDelete = (busId) => {
     console.log("button clicked", busId);
    if (window.confirm("Are you sure you want to delete this bus?")) {
      dispatch(deleteBus(busId));
       console.log("Dispatched deleteBus action for busId:", busId);
    }
  };

  const handleCreate = () => {
    setCurrentBus(null); 
    setIsModalOpen(true); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const busData = {
      busNumber: formData.get("busNumber"),
      totalSeats: formData.get("totalSeats"),
      availableSeats: formData.get("availableSeats"),
      route: formData.get("route"),
    };

    if (currentBus) {

      dispatch(updateBus({ ...currentBus, ...busData }));
    } else {
    
      dispatch(createBus(busData));
    }

    setIsModalOpen(false); 
  };

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <h2>Manage Buses</h2>
      <Button variant="contained" color="success" onClick={handleCreate} style={{marginBottom:"20px"}}>
        Add New Bus
      </Button>
      {status === "loading" && <p>Loading buses...</p>}
      {status === "succeeded" && (
        <DataGrid
          rows={buses}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.busId}
        />
      )}
      {status === "failed" && <p>Error loading buses.</p>}

     
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 400,
          }}
        >
          <Typography variant="h6">
            {currentBus ? "Edit Bus" : "Add New Bus"}
          </Typography>
          <TextField
            name="busNumber"
            label="Bus Number"
            defaultValue={currentBus?.busNumber || ""}
            required
          />
          <TextField
            name="totalSeats"
            label="Total Seats"
            type="number"
            defaultValue={currentBus?.totalSeats || ""}
            required
          />
          <TextField
            name="availableSeats"
            label="Available Seats"
            type="number"
            defaultValue={currentBus?.availableSeats || ""}
            required
          />
          <TextField
            name="route"
            label="Route"
            defaultValue={currentBus?.route || ""}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            {currentBus ? "Update Bus" : "Create Bus"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManageBuses;
