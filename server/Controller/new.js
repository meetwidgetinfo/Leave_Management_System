const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/checkinoutdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Create Mongoose Schema and Model
const checkInOutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  checkIn: { type: Date },
  checkOut: { type: Date },
});

const CheckInOut = mongoose.model('CheckInOut', checkInOutSchema);

// Express Routes
app.post('/api/checkinout', async (req, res) => {
  try {
    const { userId, checkIn, checkOut } = req.body;
    const entry = new CheckInOut({ userId, checkIn, checkOut });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/api/checkinout/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const entries = await CheckInOut.find({ userId });
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/checkinout', {
        userId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
      });
      fetchEntries();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/checkinout/${userId}`);
      setEntries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [userId]);

  return (
    <div>
      <h1>Check-In/Check-Out App</h1>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label>Check-In:</label>
        <input type="datetime-local" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      </div>
      <div>
        <label>Check-Out:</label>
        <input type="datetime-local" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Submit</button>

      <h2>Entries for User ID: {userId}</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id}>
            Check-In: {new Date(entry.checkIn).toLocaleString()} | Check-Out:{' '}
            {new Date(entry.checkOut).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
