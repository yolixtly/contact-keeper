const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect DB
connectDB();

// Init Middleware (accepts the incoming body Data)
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve Static Assets in Production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // Catch anything that is not the defined Routes
    app.get('*', (req, res) => {
        res.sendFile(__dirname, 'client', 'build',
            'index.html');
    });
}
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => console.log(`Server started on port ${PORT}`))
