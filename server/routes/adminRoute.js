const express = require('express');
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../auth/auth');
const router = express.Router();


router.post('/login', adminController.adminLogin);

// Admin login
router.post('/login', adminController.adminLogin);

// Get all patients
router.get('/patients', adminController.getAllPatients);

// Get all appointments
router.get('/appointments', adminController.getAllAppointments);

// Delete a patient
router.delete('/patients/:id', adminController.deletePatient);

// Delete a doctor
router.delete('/doctors/:id', adminController.deleteDoctor);

module.exports = router;
