const express = require('express');
const patientController = require('../controllers/patientController');
const router = express.Router();

router.post('/register', patientController.registerPatient);
router.post('/login', patientController.loginPatient);


module.exports = router;
