//finely working code

const express = require('express');
const moment = require('moment');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');



// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());


// Dummy data for parking slots
const parkingSlots = [
    { id: 1, owner: "John", capacity: 5, occupied: 0,location: { 
        lat: 11.0548,
        lng: 76.9941
    }},
    { id: 2, owner: "Alice", capacity: 10, occupied: 0,location:{
        lat:11.0708, 
        lng:76.9417
    }},
    {id: 3, owner: "Sandeep", capacity:2, occupied:0,location:{
        lat:11.0971,
        lng: 77.016332
    }},
    {id: 4, owner:"Ashok", capacity:4,occupied:0,location:{
        lat:11.0854, 
        lng:76.9961
    }},
    {id: 5, owner:"Guna", capacity:2,occupied:0,location:{
        lat:11.0225, 
        lng:76.9987
    }}
];


// Object to store parking start times
const parkedVehicles = {};

// Endpoint to get available parking slots
app.get('/parking-slots', (req, res) => {
    res.json(parkingSlots.filter(slot => slot.capacity > slot.occupied));
});

//Endpoint to add parking slot
app.post('/add-parking-slot', (req, res) => {
    const { owner, capacity } = req.body;
    const id = parkingSlots.length + 1; // Generate a unique ID for the new parking slot
    
    // Check if owner, capacity, and pricePerHour are provided
    if (!owner || !capacity ) {
        return res.status(400).json({ error: "Owner and  capacity are required" });
    }

    // Add the new parking slot to the parkingSlots array
    parkingSlots.push({ id, owner, capacity, occupied: 0 });
    
    res.json({ message: "Parking slot added successfully", newSlot: { id, owner, capacity } });
});
//Endpoint to get remaining parking slots
app.post('/remaining-slots', (req, res) => {
    const { slotId } = req.body;
    const slot = parkingSlots.find(slot => slot.id === slotId);
    if (!slot) {
        return res.status(404).json({ error: "Parking slot not found" });
    }
    const remainingSlots = slot.capacity - slot.occupied;
    res.json({ slotId, remainingSlots });
});



// Endpoint to park a vehicle
app.post('/park', (req, res) => {
    const { slotId } = req.body;
    const slot = parkingSlots.find(slot => slot.id === slotId);
    if (!slot) {
        return res.status(404).json({ error: "Parking slot not found" });
    }
    if (slot.capacity <= slot.occupied) {
        return res.status(400).json({ error: "Parking slot is full" });
    }
    slot.occupied++;
    // Store the parking start time for the vehicle
    parkedVehicles[slotId] = moment();
    res.json({ message: "Vehicle parked successfully" });
});

// Endpoint to get parking duration
app.get('/parking-time', (req, res) => {
    const { slotId } = req.query;
    const startTime = parkedVehicles[slotId];
    if (!startTime) {
        return res.status(404).json({ error: "Vehicle not found in the parking slot" });
    }
    const duration = moment().diff(startTime, 'minutes');
    res.json({ slotId, duration });
});

app.get('/calc-tariff', (req, res) => {
    const { slotId } = req.query;
    const startTime = parkedVehicles[slotId];
    if (!startTime) {
        return res.status(404).json({ error: "Vehicle not found in the parking slot" });
    }
    const durationInMinutes = moment().diff(startTime, 'minutes');
    
    // Calculate the tariff
    const baseCharge = 10;
    const additionalChargePer10Minutes = 5;
    
    let totalCharge = baseCharge;
    const additionalMinutes = durationInMinutes - 30;
    if (additionalMinutes > 0) {
        const additionalCharge = Math.ceil(additionalMinutes / 10) * additionalChargePer10Minutes;
        totalCharge += additionalCharge;
    }

    res.json({ slotId, durationInMinutes, totalCharge });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

