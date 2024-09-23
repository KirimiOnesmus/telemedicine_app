const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const port=3000;

const doctorRoutes = require('./routes/doctorsRoute');
const patientRoutes = require('./routes/patientRoute');
const appointmentRoutes = require('./routes/appointmentRoute');
const adminRoutes = require('./routes/adminRoute');

const app = express();

// main route
app.get('/',(req,res)=>{
    res.send('Welcome to the telemedicine App');
});
// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Routes

app.use('/doctors', doctorRoutes);   
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/admin', adminRoutes); 

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
