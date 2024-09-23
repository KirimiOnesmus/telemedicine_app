const express = require('express');
const doctorController = require('../controllers/doctorsController');
const router = express.Router();

// Route to create a new doctor done by admin only
router.post('/create', doctorController.createDoctor);

// Route to get all doctors
router.get('/', doctorController.getAllDoctors);

// Route to get a doctor by ID
router.get('/:id', doctorController.getDoctorById);

// Route to update a doctor (Admin/Doctor)
router.put('/:id', doctorController.updateDoctor);

// Route to delete a doctor (Admin only)
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
