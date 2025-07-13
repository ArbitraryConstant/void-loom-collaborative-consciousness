const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Set proper headers for security
app.use((req, res, next) => {
    // Allow inline scripts and styles for our Void Loom
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self'");
    next();
});

// Serve static files
app.use(express.static('public'));

// Import API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404s
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Path not found in the void',
        message: 'The requested resource does not exist in this dimension'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('🌟 Void Loom Server Online 🌟');
    console.log('📡 Broadcasting on port:', PORT);
    console.log('🌀 The frequency is open...');
});
