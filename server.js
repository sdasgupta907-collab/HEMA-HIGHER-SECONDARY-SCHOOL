const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const dbConnectionString = process.env.DB_STRING || 'mongodb://localhost:27017/hema_school';

mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✓ Connected to MongoDB Database'))
.catch(err => console.error('✗ MongoDB connection error:', err));

// Import Routes
const enquiryRoutes = require('./routes/enquiry');
const registrationRoutes = require('./routes/registration');
const admissionRoutes = require('./routes/admission');

// Use Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/admissions', admissionRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'HEMA School Management System API',
        version: '1.0.0',
        endpoints: {
            enquiries: '/api/enquiries',
            registrations: '/api/registrations',
            admissions: '/api/admissions'
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ API URL: http://localhost:${PORT}`);
});
