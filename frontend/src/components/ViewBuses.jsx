import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuses, bookBus } from "../redux/busSlice";

const ViewBuses = () => {
  const dispatch = useDispatch();
  const buses = useSelector((state) => state.bus.buses);

  useEffect(() => {
    dispatch(fetchBuses()); 
  }, [dispatch]);

  const handleBookBus = (busId) => {
    dispatch(bookBus(busId)); 
  };
  

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        View Buses
      </Typography>
      <Grid container spacing={3}>
        {buses.map((bus) => (
          <Grid item xs={12} sm={6} md={4} key={bus.id || bus.busId}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Bus Number: {bus.busNumber}
                </Typography>
                <Typography>Route: {bus.route}</Typography>
                <Typography>Seats Available: {bus.availableSeats}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 1 }}
                  onClick={() => handleBookBus(bus.busNumber)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewBuses